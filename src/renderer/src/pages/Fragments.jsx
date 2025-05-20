import { useEffect, useState } from 'react';



function Fragments() {
  const [fragments, setFragments] = useState([]);
  
const [selectedFragment, setSelectedFragment] = useState(null);
const [isEditing, setIsEditing] = useState(false);


  useEffect(() => {
    async function fetchFragments() {
      const data = await window.electronAPI.getFragments();
      setFragments(data || []);
    }

    fetchFragments();
  }, []);
  const handleCopyCode = () => {
    if (selectedFragment) {
      navigator.clipboard.writeText(selectedFragment.code)
        .then(() => alert('Code copied to clipboard!'))
        .catch((err) => console.error('Error while copying', err));
    }
  };
  

  
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this fragment?')) {
      window.electronAPI.deleteFragment(id);
      setFragments(prev => prev.filter(frag => frag.id !== id));
    }
  };
  const handleSaveEdit = () => {
    window.electronAPI.editFragment(selectedFragment);
  
    setFragments(prev => prev.map(frag => 
      frag.id === selectedFragment.id ? selectedFragment : frag
    ));
  
    setIsEditing(false);
    setSelectedFragment(null);
  
    alert('Fragment updated successfully!'); 
  };
  
  
    
  return (
    <div className="fragments-page">
      <h2 className="fragments-title">My Saved Fragments</h2>

      {fragments.length === 0 ? (
        <p className="no-fragments">	No fragments yet.</p>
      ) : (
        <ul className="fragments-list">
          {fragments.map(fragment => (
            <li key={fragment.id} className="fragment-card">
              <h3 className="fragment-title">{fragment.title}</h3>
              <p className="fragment-tags"><strong>Tags :</strong> {fragment.tags.join(', ')}</p>

              <pre className="fragment-code">
                {fragment.code}
              </pre>

              <div className="fragment-buttons">
              <button className="btn btn-view" onClick={() => setSelectedFragment(fragment)}>View</button>
              <button 
  className="btn btn-edit"
  onClick={() => {
    setSelectedFragment(fragment);
    setIsEditing(true);
  }}
>
  Edit
</button>

  <button 
  className="btn btn-delete"
  onClick={() => handleDelete(fragment.id)}
>
  Delete
</button>

</div>

            </li>
          ))}
        </ul>
      )}
    
      {/*  MODALE */}
      {selectedFragment && !isEditing && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{selectedFragment.title}</h2>
            <p><strong>Tags :</strong> {selectedFragment.tags.join(', ')}</p>
            <pre className="modal-code">{selectedFragment.code}</pre>

            <div className="modal-buttons">
              <button className="btn btn-copy" onClick={handleCopyCode}>📋 Copy</button>
              <button className="btn btn-close" onClick={() => setSelectedFragment(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    {/* Modal Edit */}
    {isEditing && selectedFragment && (
  <div className="modal-overlay">
    <div className="modal">
      <h2>Edit Fragment</h2>

      <div className="form-group">
        <label>Title:</label>
        <input
          type="text"
          value={selectedFragment.title}
          onChange={(e) => setSelectedFragment({ ...selectedFragment, title: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label>Tags (separated by commas):</label>
        <input
          type="text"
          value={selectedFragment.tags.join(', ')}
          onChange={(e) => setSelectedFragment({ ...selectedFragment, tags: e.target.value.split(',').map(tag => tag.trim()) })}
        />
      </div>

      <div className="form-group">
        <label>Code:</label>
        <textarea
          rows="8"
          value={selectedFragment.code}
          onChange={(e) => setSelectedFragment({ ...selectedFragment, code: e.target.value })}
        ></textarea>
      </div>

      <div className="modal-buttons">
        <button className="btn btn-save" onClick={handleSaveEdit}>Save Changes</button>
        <button className="btn btn-close" onClick={() => {
          setSelectedFragment(null);
          setIsEditing(false);
        }}>
          Cancel
        </button>
      </div>
    </div>
  </div>
)} 
</div>   
  );
}

export default Fragments;
