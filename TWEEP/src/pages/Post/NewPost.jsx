import Cookies from 'js-cookie';
import { useState } from 'react';
import { currentUserIdAtom } from '../../Atom/atom';
import { useAtomValue } from 'jotai';

export const NewPost = () => {

  const [content, setContent] = useState('');
  const token = Cookies.get('token');
  const userId = useAtomValue(currentUserIdAtom);


  function handleSubmit(event) {
    event.preventDefault();

    const postData = {
      "texte": content,
      "user": userId
    }

    fetch('http://localhost:1337/api/posts', {
      method: "post",
      headers: {
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: postData }),
    })
    .then((response) => response.json())
    .then((data) => {
      setContent(''); // Réinitialiser les champs du formulaire
      console.log(data);
    })
    .catch((error) => console.error(error));
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="content">Contenu :</label>
        <textarea id="content" value={content} onChange={(event) => setContent(event.target.value)} />
      </div>
      <button type="submit">Créer le post</button>
    </form>
  );
}
