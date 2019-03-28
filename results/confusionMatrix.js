const ConfusionMatrix = require('ml-confusion-matrix');
const fs = require('fs');

module.exports.logConfusionMatrixData = (sourceFilePath, destDir) => {
  fs.readFile(sourceFilePath, (err, data) => {
    const obj = JSON.parse(Buffer.from(data).toString('utf8')).results;
    const trueLabels = obj.map(d => d.assignedClass);
    const predictedLabels = obj.map(d => d.correctClass);
    const CM2 = ConfusionMatrix.fromLabels(trueLabels, predictedLabels);
    createConfusionMatrix(CM2, destDir);
    createConfusionTables(CM2, destDir);
  });
};

const createConfusionMatrix = (CM2, destDir) => {
  const fullPath = `${destDir}/matrix.csv`
  const matrix = CM2.getMatrix();
  const labels = CM2.getLabels();
  fs.writeFileSync(fullPath, ''); // clear file
  fs.appendFileSync(fullPath, `,${labels.toString()}\n`);
  for (let i = 0; i < matrix.length; i++) {
    fs.appendFileSync(fullPath, `${labels[i]},${matrix[i].toString()}\n`);
  }
};

const createConfusionTables = (CM2, destDir) => {
  const fullPath = `${destDir}/confusion-table.json`
  const confusionTables = [];
  CM2.getLabels().forEach(l => {
    const table = CM2.getConfusionTable(l);
    confusionTables.push({
      label: l,
      truePositive: table[0][0],
      falseNegative: table[0][1],
      falsePositive: table[1][0],
      trueNegative: table[1][1],
    });
  });
  const sorted = confusionTables.sort((a, b) => (b.falseNegative + b.falsePositive) - (a.falseNegative + a.falsePositive));
  fs.writeFileSync(fullPath, JSON.stringify(sorted, null, 2));
};
