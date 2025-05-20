import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

//  Utilisation sécurisée
const { sendFragment } = window.electronAPI || {};

function Form() {
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [code, setCode] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const fragment = {
      title,
      tags: tags.split(',').map(tag => tag.trim()),
      code
    };

    if (sendFragment) {
      sendFragment(fragment);
      navigate('/fragments');
    } else {
      console.error('electronAPI non disponible');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Add a New Fragment</h2>

      <label>Title :</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <label>Tags (separated by commas) :</label>
      <input
        type="text"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />

      <label>Code :</label>
      <textarea
        rows="8"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        required
      ></textarea>

      <button type="submit" id='addfil'>	Add</button>
    </form>
  );
}

export default Form;
