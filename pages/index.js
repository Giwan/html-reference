import Head from "next/head";
import styles, {
    main,
    elementItemStyle,
    detailPageStyle,
    detailPageTitle,
    closeButtonStyle,
    detailPageDescription
} from "../styles/Home.module.css";
import elementsData from "../data/elementsRef.js";
import { useState } from "react";

export default function Home() {
    const elementsList = Object.keys(elementsData);
    const [selectedElement, setSelectedElement] = useState(undefined);

    const selectElement = (e) => {
        setSelectedElement(e.currentTarget.id);
    };
    const clearElement = () => setSelectedElement(null);
    return (
        <div className={styles.container}>
            <Head>
                <title>HTML Reference</title>
                <meta
                    name="description"
                    content="HTML reference"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={main}>
                {selectedElement && (
                    <article className={detailPageStyle}>
                        <button onClick={clearElement} className={closeButtonStyle}>&times;</button>
                        <h1 className={detailPageTitle}>{selectedElement}</h1>
                        <p className={detailPageDescription}>{elementsData[selectedElement]}</p>
                    </article>
                )}

                {!selectedElement &&
                    elementsList.map((el) => (
                        <div
                            className={elementItemStyle}
                            onClick={selectElement}
                            id={el}
                            key={el}
                        >
                            {el}
                        </div>
                    ))}
            </main>
        </div>
    );
}
