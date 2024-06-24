import './services.css';
import { useAuth } from '../store/auth';

export const Services = () => {
  const { services } = useAuth();
  console.log("Type of services:", services);

  // Extract the array from the 'data' property if needed
  // const servicesArray = Array.isArray(services) ? services : (services && services.data) || [];

  return (
    <div className="services-container">
      <h1>Services</h1>
      <div className="card-container">
        {services.map((service, index) => (
          <div key={index} className="card">
            <h3>{service.title}</h3>
            {service.image && (
              <img src={service.image} alt={service.title} className="card-image" />
            )}
            <p>{service.description}</p>
            <p>{service.price}</p>
            <p>{service.duration}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
