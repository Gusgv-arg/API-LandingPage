import mongoose from 'mongoose';

const knowledgeBaseSchema = new mongoose.Schema({
  knowledgeBase: { type: String, required: true },
  embedding: { type: Array, required: true }
});

const KnowledgeBase = mongoose.model('KnowledgeBase', knowledgeBaseSchema);

export default KnowledgeBase