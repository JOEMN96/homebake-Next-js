import Image from "next/image";
import styles from "../../styles/SurprisePacks.module.scss";

function SurprisepackCard({ pack }) {
  const { title, price, description, images } = pack;
  return (
    <article className={styles.surprisePackCard}>
      <Image
        width={200}
        height={220}
        src={`${process.env.CMSDOMAIN}${images[0].url}`}
        alt={title}
      />
      <div>
        <h1>{title}</h1>
        <div className={styles.priceArea}>
          <p>₹ {price}</p>
          <button>Buy</button>
        </div>
        <p>{description}</p>
      </div>
    </article>
  );
}

export default SurprisepackCard;
