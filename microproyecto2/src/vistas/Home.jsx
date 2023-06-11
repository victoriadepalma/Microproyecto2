

const Home = () => {
      
      const images = [
        'https://via.placeholder.com/150x150?text=Slide%201',
    'https://via.placeholder.com/150x150?text=Slide%202',
    'https://via.placeholder.com/150x150?text=Slide%203',
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

          
         
        </div>
      );
}

export default Home;
