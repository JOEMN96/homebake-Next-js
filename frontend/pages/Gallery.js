function Gallery() {
  return (
    <>
      <section className="contactPageHeader"></section>

      <div className="titleWrapper">
        <h1 className="headings">Gallery</h1>
        <h2>Moments</h2>
      </div>

      <style jsx>
        {`
          .contactPageHeader {
            background: url(/images/gallery.svg) no-repeat center center;
            background-position: center center;
            background-size: 50%;
            background-repeat: no-repeat;
          }
          .contactPageHeader {
            height: 40vh;
          }
        `}
      </style>
    </>
  );
}

export default Gallery;
