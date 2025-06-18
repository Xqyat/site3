import { Link } from 'react-router-dom';
export default function Cards({ data, type }) {
  if (!data) return null;

  const id = data.id;

  switch (type) {
    case 'character':
      return (
        <Link to={`/characters/${id}`} className="characters__card card">
          <img className="characters__card-image" src={data.image} alt={data.name} />
          <div className="characters__card-info">
            <h3>{data.name}</h3>
            <span>{data.species || 'Unknown'}</span>
          </div>
        </Link>
      );

    case 'location':
      return (
        <Link to={`/locations/${id}`} className="locations__card card">
          <div className="locations__card-info">
            <h3>{data.name}</h3>
            <span>{data.dimension || 'Unknown'}</span>
          </div>
        </Link>
      );

    case 'episode':
      return (
        <Link to={`/episodes/${id}`} className="episodes__card card">
          <div className="episodes__card-info">
            <h3>{data.name}</h3>
            <span>{data.air_date || 'Unknown'}</span>
            <div className="episodes__card-serie">{data.episode || 'Unknown'}</div>
          </div>
        </Link>
      );

    default:
      return (
        <div className="card">
          <div className="card-info">
            <h3>Unknown</h3>
          </div>
        </div>
      );
  }
}
