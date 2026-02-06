import React from 'react'

const Projects: React.FC = () => {
  return (
    <section className="container projects" style={{ padding: 20 }}>
      <h2>Projects</h2>
      <p>Example projects — replace with your project cards or embedded demos.</p>
      <div className="row">
        <div className="col s12 m6">
          <h5>Bentome</h5>
          <h6>A former home cook Bento Bussiness</h6>
          <h6>Features:</h6>
            <ul>
                <li>Login/Regestration</li>
                <li>Stripe integration for payments.</li>
                <li>Admin control panal to manage weekly menu.</li>
                <li>Consumer Order History</li>
            </ul>
          <img src="/images/bentome.jpg" alt="bentome" style={{ width: '100%' }} />
        </div>
    </div>
    <div className="row">
     <div className="col s12 m6">
          <h5>SM Parking</h5>
          <h6>Parking information and routing for Santa Monica City Public Parking Lots.</h6>
          <p>Add screenshots or links here.</p>
          <h6>Features:</h6>
          <ul>
            <li>External API Call for fresh parking lot data that is updated every two minutes.</li>
            <li>Routing provided by google maps app if installed.</li>
            <li>Routing provided by google maps in safari if app is not installed.</li>
           </ul>
        <video controls muted src="/images/smparking demo.mov" autoPlay loop height={800} poster="posterimage.jpg"></video>
        <p>App has been shutdown due to supporting external API unfortunately being shut down by Santa Monica.</p>
        </div>
      </div>
    </section>
  )
}

export default Projects
