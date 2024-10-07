import { useState } from "react";
import "./SearchBar.css";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/Config";

// export default function SearchComponent() {
//   const [title, setTitle] = useState("");
//   const [results, setResults] = useState([]);

//   const handleInputChange = (e) => {
//     e.preventDefault();
//     setTitle(e.target.value);
//   };

//   const searchByTitle = async () => {
//     try {
//       const itemsRef = collection(db, "recipes");
//       console.log(itemsRef);
      
//       const q = query(itemsRef, where("title".toLowerCase(), "==", title.toLowerCase()));
//       // console.log(q);
      
//       const querySnapshot = await getDocs(q);
//       // console.log(querySnapshot);

//       const fetchedResults = [];
//       querySnapshot.forEach((doc) => {
//         fetchedResults.push({ id: doc.id, ...doc.data() });
//       });
//       setResults(fetchedResults);
//     } catch (error) {
//       console.console.error("Error searching by title", error);
//     }
//   };
//   return (
    // <div className="search-bar">
    //   <form onSubmit={handleSubmit}>
    //     <label>
    //       <span>Search:</span>
    //       <input type="text" onChange={(e)=> e.target.value} value={title} required />
    //     </label>
    //   </form>
    // </div>
//     <div>
//     <input
//       type="text"
//       value={title}
//       onChange={handleInputChange}
//       placeholder="Enter title to search"
//     />
//     <button onClick={searchByTitle}>Search</button>

//     <div>
//       <h3>Results:</h3>
//       {results.length > 0 ? (
//         results.map((result) => (
//           <div key={result.id}>
//             <p>{result.title}</p>
//             {/* Display other fields if needed */}
//           </div>
//         ))
//       ) : (
//         <p>No results found</p>
//       )}
//     </div>
//   </div>
//   );
// }


const SearchComponent = () => {
  const [title, setTitle] = useState("");
  const [result, setResult] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const handleInputChange = (e) => {
    setTitle(e.target.value);
    setResult(null); // Clear previous result when input changes
    setNotFound(false);
  };

  const searchByTitle = async () => {
    try {
      // Reference to the collection
      const itemsRef = collection(db, "recipes");

      // Create a query to find an item by title
      const q = query(itemsRef, where("title", "==", title));

      // Execute the query
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // Extract the first result
        const doc = querySnapshot.docs[0];
        setResult({ id: doc.id, ...doc.data() });
      } else {
        setNotFound(true); // Set not found if no results are returned
      }
    } catch (error) {
      console.error("Error searching by title: ", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={title}
        onChange={handleInputChange}
        placeholder="Enter title to search"
      />
      <button onClick={searchByTitle}>Search</button>

      {result && (
        <div>
          <h3>Result Found:</h3>
          <p>{result.title}</p>
          {/* Display other fields if needed */}
        </div>
      )}

      {notFound && <p>No result found for the entered title.</p>}
    </div>
  );
};

export default SearchComponent;

