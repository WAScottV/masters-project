DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetTrainingAndTestingRecords`(IN trainingPct DECIMAL(2, 1), IN responseColumn INT, IN randomSeed INT)
BEGIN
	  
	# Get the number of records per classifier to be used for training
    # Only include classifiers for one of the response columns indicated
	# by responseColumn parameter
	CREATE TEMPORARY TABLE Category
	SELECT
		Classifier,
		COUNT(Classifier) AS AllCnt,
		FLOOR(COUNT(Classifier) * trainingPct) AS TrainingCnt
	FROM
		Response
	WHERE
		ResponseNum = responseColumn
        AND Include = 1
	GROUP BY
		Classifier;

	# Number each classifier record to generate new data marked for training each run
    # If randomSeed is null, randomize what's used for training and testing
    # If randomSeed is not null, use the seed value so same values are returned
		# each time the same seed value is used
	# Choose response value based on responseColumn parameter
	CREATE TEMPORARY TABLE Staging
	SELECT
		c.Classifier,
        c.AllCnt,
        c.TrainingCnt,
		ROW_NUMBER() OVER (PARTITION BY c.Classifier ORDER BY 
										CASE
											WHEN randomSeed IS NULL THEN RAND()
                                            ELSE RAND(randomSeed)
										END) AS Num,
		r.Response
	FROM
		Category c
		INNER JOIN
		response r
			ON r.Classifier = c.Classifier
	WHERE
		r.ResponseNum = responseColumn
        AND Include = 1;
		
	# Records used for training
	SELECT 
		Classifier,
        AllCnt,
        TrainingCnt,
        Num,
        Response
	FROM
		Staging
	WHERE
		Num <= TrainingCnt;
        
	# Records used for testing
	SELECT 
		Classifier,
        AllCnt,
        TrainingCnt,
        Num,
        Response
	FROM
		Staging
	WHERE
		Num > TrainingCnt;
		
	DROP TEMPORARY TABLE Category;
	DROP TEMPORARY TABLE Staging;
END$$
DELIMITER ;
