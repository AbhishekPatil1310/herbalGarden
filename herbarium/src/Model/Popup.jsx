import { Html } from '@react-three/drei';

const ObjectPopup = ({ name, position,CommonName, family, scientificName, collector, country, uses, onClose }) => {
  return (
    <Html position={position}>
      <div id='popup'>
        <h3>{name}</h3>
        <><strong>CommonName:</strong>{CommonName}</>
        <p><strong>Family:</strong> {family}</p>
        <p><strong>Scientific Name:</strong> <em>{scientificName}</em></p>
        <p><strong>Collector:</strong> {collector}</p>
        <p><strong>Country:</strong> {country}</p>
        <p><strong>Uses:</strong> {uses}</p>
        <button onClick={onClose} id='button'>Close</button>
      </div>
    </Html>
  );
};

export default ObjectPopup;
