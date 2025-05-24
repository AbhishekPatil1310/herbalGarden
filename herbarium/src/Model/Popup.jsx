import { Html } from '@react-three/drei';

const ObjectPopup = ({ Cube, position, CommonName, family, scientificName, collector, country, uses, onClose }) => {
  const imageNumber = Cube.match(/\d+/)?.[0];
  const imageUrl = `/assets/${imageNumber}.jpg`;

  return (
    <Html position={position}>
      <div
        id='popup'
        className="bg-white p-4 rounded shadow-lg max-w-xs text-sm max-h-80 overflow-y-auto"
      >
        <h3 className="text-lg font-bold mb-2">{CommonName || Cube}</h3>
        <img
          src={imageUrl}
          alt={CommonName || Cube}
          className="mb-2 w-full h-auto object-cover rounded"
          onError={(e) => (e.target.style.display = 'none')}
        />
        <><strong>CommonName:</strong>{CommonName}</>
        <p><strong>Family:</strong> {family}</p>
        <p><strong>Scientific Name:</strong> <em>{scientificName}</em></p>
        <p><strong>Collector:</strong> {collector}</p>
        <p><strong>Country:</strong> {country}</p>
        <p><strong>Uses:</strong> {uses}</p>
        <button
          onClick={onClose}
          className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Close
        </button>
      </div>
    </Html>
  );
};

export default ObjectPopup;
