import { useState, useEffect } from 'react';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

export const DataForm = () => {
  const [data, setData] = useState();
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);

  const firestore = getFirestore();

  useEffect(() => {
    async function getDataFromFirestore() {
      try {
        const docRef = doc(firestore, 'data', 'wycFgSaYoit5w6CSmVZb');
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          setData(data);
          console.log('data: ', data);
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error getting document:', error);
      }
    }

    getDataFromFirestore();
  }, [firestore]);

  const writeUserData = async e => {
    e.preventDefault();

    try {
      const docRef = doc(firestore, 'data', 'wycFgSaYoit5w6CSmVZb');
      const data = { name, age };
      await setDoc(docRef, data);
      setName('');
      setAge('');
      setData(data);
      console.log('Document successfully written!');
    } catch (error) {
      console.error('Error writing document:', error);
    }
  };

  return (
    <section className="section">
      <form onSubmit={writeUserData} className="form">
        <h4>Data form</h4>
        <input
          type="text"
          value={name}
          placeholder="Username"
          onChange={e => setName(e.target.value)}
          required
        />
        <input
          type="number"
          value={age}
          placeholder="Age"
          onChange={e => setAge(e.target.value)}
          required
        />
        <button type="submit">Send</button>
      </form>
      {data && (
        <div className="dataWrap">
          <p>Name: {data.name}</p>
          <p>Age: {data.age}</p>
        </div>
      )}
    </section>
  );
};
