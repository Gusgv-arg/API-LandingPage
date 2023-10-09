function calculateCosineSimilarity(vecA, vecB) {
  let dotProduct = 0;
  let magnitudeA = 0;
  let magnitudeB = 0;

  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    magnitudeA += Math.pow(vecA[i], 2);
    magnitudeB += Math.pow(vecB[i], 2);
  }

  magnitudeA = Math.sqrt(magnitudeA);
  magnitudeB = Math.sqrt(magnitudeB);

  if (magnitudeA === 0 || magnitudeB === 0) {
    return 0;
  } else {
    let cosineSimilarity = dotProduct / (magnitudeA * magnitudeB);
    return cosineSimilarity;
  }
}

export default calculateCosineSimilarity;
