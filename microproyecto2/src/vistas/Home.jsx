

const Home = () => {
      
      const images = [
        'https://cdn.britannica.com/08/190708-050-634BBDC0/Woman-container-popcorn-cinema-movie-theater.jpg',
        'https://cdn.britannica.com/08/190708-050-634BBDC0/Woman-container-popcorn-cinema-movie-theater.jpg',
        'hhttps://www.unimet.edu.ve/wp-content/uploads/2022/06/FOTOS-UNIMET-TOUR-2022-17-1030x687.jpg',
        'https://via.placeholder.com/150x150?text=Slide%204',
        'https://via.placeholder.com/150x150?text=Slide%205',
      ];
    
      return (
        <div>
         
          <div className="carousel">
            {images.map((image, index) => (
              <div key={index} className={`slide ${index === 0 ? 'active' : ''}`}>
                <img src={image} alt={`Slide ${index + 1}`} />
              </div>
            ))}
            <button className="prev">&#10094;</button>
            <button className="next">&#10095;</button>
          </div>

          <div className="grid">
      {images.map((image, index) => (
        <div key={index} className="grid-item">
          <img src={image} alt={`Photo ${index + 1}`} />
        </div>
      ))}
    </div>
         
        </div>
      );
}

export default Home;
