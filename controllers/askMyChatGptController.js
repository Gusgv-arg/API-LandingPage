import { processMessageToMyChatGpt } from '../utils/processMessageToMyChatGpt.js';
import Message from '../models/messageModel.js';
import KnowledgeBase from '../models/knowledgeBaseModel.js';
import { embeddingServicesChatGpt } from '../utils/embeddingServicesChatGpt.js';
import calculateCosineSimilarity from '../utils/calculateCosineSimilarity.js';

export const askMyChatGptController = async (req, res) => {
  try {
    const { messages } = req.body;

    const userQuestion = messages[messages.length - 1].content;

    // Convert the user's question to an embedding.
    const userQuestionEmbedding = await embeddingServicesChatGpt(userQuestion);

    // Fetch the stored knowledge base from the database
    const knowledgeBaseInDb = await KnowledgeBase.find({});

    // Calculate the cosine similarity between the user's question and each knowledge base entry
    let mostSimilarEntry = null;
    let highestSimilarity = -1;
    for (const entry of knowledgeBaseInDb) {
      const similarity = calculateCosineSimilarity(
        userQuestionEmbedding.data[0].embedding,
        entry.embedding,
      );
      //console.log("similarity", similarity, "knowledgebase", entry.knowledgeBase)
      if (similarity > highestSimilarity) {
        highestSimilarity = similarity;
        mostSimilarEntry = entry.knowledgeBase;
      }
    }

    // Adds message from the user to the db
    const newMessage = new Message({
      role: messages[messages.length - 1].role,
      content: messages[messages.length - 1].content,
    });
    await newMessage.save();

    // Add the most similar knowledge base entry to the messages array
    messages.push({
      role: 'system',
      content: `La siguiente información se corresponde a la base de conocimiento que de corresponder deberá ser usada en su totalidad para una mejor respuesta al usuario. Si no se sabe la respuesta responde que no sabes y que daras aviso a un agente: ${mostSimilarEntry}`,
    });
    console.log('Fuente para contestar: ---> ', mostSimilarEntry);
    //Makes new object with openai's required format
    const newArray = [];

    const systemMessage = {
      role: 'system',
      content:
        'Actúa como si fueras un asesor comercial encargado de contestar preguntas a potenciales clientes interesados en implementar un chatbot de inteligencia artificial. Solo responde con información que se te ha brindado para tu entrenamiento ya sea a traves del fine tunning o del método de embedding. Si te consultan por temas que no tienen que ver con tu entrenamiento pide disculpas y responde que solo fuiste autorizado a responder preguntas específicas para implementar un chatbot de inteligencia artificial.',
    };

    newArray.push(systemMessage);

    messages.forEach((originalObj) => {
      const newObj = {
        role: originalObj.role,
        content: originalObj.content,
      };
      newArray.push(newObj);
    });

    const response = await processMessageToMyChatGpt(newArray);
    const newResponse = new Message({
      role: 'assistant',
      content: response.message.content, //antes era .text
    });
    await newResponse.save();

    res.send({ role: 'assistant', content: response.message.content });
  } catch (error) {
    res.send({ message: error.message });
  }
};

/*Si quiero trabajar con más de una sola baseKnowledge*/
/* export const askMyChatGptController = async (req, res) => {

try {
	const  {messages}  = req.body;

	const userQuestion = messages[messages.length - 1].content;

	// Convert the user's question to an embedding
	const userQuestionEmbedding = await embeddingServicesChatGpt(userQuestion);
	
	// Fetch the stored knowledge base from the database
	const knowledgeBaseInDb = await KnowledgeBase.find({});

	// Initialize an array to hold the top two entries
let topTwoEntries = [{similarity: -1}, {similarity: -1}];

for (const entry of knowledgeBaseInDb) {
    const similarity = calculateCosineSimilarity(userQuestionEmbedding.data[0].embedding, entry.embedding);
    console.log("similarity", similarity, "knowledgebase", entry.knowledgeBase)
    
    // Check if the similarity is higher than the lowest of the top two
    if (similarity > topTwoEntries[0].similarity) {
        topTwoEntries[0] = {similarity: similarity, knowledgeBase: entry.knowledgeBase};
        
        // Sort the array in ascending order of similarity
        topTwoEntries.sort((a, b) => a.similarity - b.similarity);
    }
}

// Add the most similar knowledge base entries to the messages array
topTwoEntries.forEach(entry => {
    messages.push({
        title: messages[messages.length-1].title,
        role: 'system',
        content: `La siguiente información se corresponde a la base de conocimiento que deberá ser usada para una mejor respuesta al usuario: ${entry.knowledgeBase}`
    });
});
	

	// Adds message from the user to the db
	const newMessage = new Message({
		title: messages[messages.length - 1].title,
		role: messages[messages.length - 1].role,
		content: messages[messages.length - 1].content,
	});
	await newMessage.save();

	
console.log("TopTwo", topTwoEntries)
	//Makes new object with openai's required format
	const newArray = [];
	
	const systemMessage = {
		role: "system",
		content: "Actuá como si fueras un asesor comercial encargado de contestar preguntas a potenciales clientes intereados en implementar un chatbot de inteligencia artificial. Solo responde con información que sea específica de este modelo brindada a traves del fine tunning o del embedding.",
	};
	
	newArray.push(systemMessage)

	messages.forEach((originalObj) => {
		const newObj = {
			role: originalObj.role,
			content: originalObj.content,
		};
		newArray.push(newObj);
	});

	const response = await processMessageToMyChatGpt(newArray);
	const newResponse = new Message({
		title: messages[messages.length - 1].title,
		role: "assistant",
		content: response.message.content,  //antes era .text
	});
	await newResponse.save();

	res.send({ role: "assistant", content: response.message.content });
} catch (error) {
	res.send({message: error.message})
}
}; */
