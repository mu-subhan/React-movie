import { Client, Databases, Query } from "appwrite";

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

const client = new Client().setEndpoint('https://cloud.appwrite.io/v1').setProject(PROJECT_ID);

const database = new Databases(client);

export const updateSearchCount = async(searchTerm, movie)=>{
  // use Appwrite SDK to check if the search rerm exists int he database
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID,[Query.equal('searchTerm', searchTerm)]);

// if it does update the count
if(result.documents.length > 0){
 const doc = result.documents[0];

 await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
   count: doc.count + 1,
//    movie: movie

    });
    //  if it does not exist create a new document

  } else {
    await database.createDocument(DATABASE_ID, COLLECTION_ID, {
      searchTerm: searchTerm,
      count: 1,
      movie_id: movie.id,
      poster_url:`https://image.tmdb.org/t/p/w500${movie.poster_path}`,
    });
  }   
    } catch (error) {
      console.error(error);
    }   
    }


    export const getTrendingMovies = async () => {
      try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
          Query.limit(5),
          Query.orderDesc("count"),
        ]);
        console.log('Trending Movies:', result.documents);  // Log the result for debugging
        return result.documents;
      } catch (error) {
        console.error('Error fetching trending movies:', error);
      }
    };
    
    