import { useState, useEffect } from 'react';
import Wordbox from '../Wordbox';
import wordList from '../../word-list.tsx';
import './style.css';
const generateWord = (size: number) => {
  console.log("Generating word of size:", size);
  const sizeIndex = size === undefined
    ? Math.floor(Math.random() * wordList.length) : size - 3;
  console.log("Size index:", sizeIndex);
  if (sizeIndex < 0 || sizeIndex >= wordList.length) {
    console.log("Size index out of bounds, returning null");
    return null;
  }
  const words = wordList[sizeIndex];
  const wordIndex = Math.floor(Math.random() * words.length);
  console.log("Selected word index:", wordIndex);
  console.log("Generated word:", words[wordIndex]);
  return words[wordIndex];
};
const Stage = () => {
  const [words, setWords] = useState<string[]>([generateWord(6) || '', generateWord(6) || '', generateWord(6) || '']);
  const [mistakes, setMistakes] = useState<number>(0);
  const [finishedWord, setFinishedWord] = useState<boolean>(false);
  const handleFinish = () => {
    setFinishedWord(true);
  };
  const handleMistake = () => {
    setMistakes(prevMistakes => prevMistakes + 1);
  };
  useEffect(() => {
    if (finishedWord) {
      setWords(prevWords => {
        const newWord = generateWord(6);
        if (newWord) {
          const newWordsArray = [...prevWords.slice(1), newWord];
          console.log("New words array:", newWordsArray);
          return newWordsArray;
        }
        const newWordsArray = prevWords.slice(1);
        console.log("New words array (no new word):", newWordsArray);
        return newWordsArray;
      });
      setFinishedWord(false);
    }
  }, [finishedWord]);
  return (
    <div className="stage">
      <div className="stage__mistakes">Chyb: {mistakes}</div>
      <div className="stage__words">
        {words.map((word, index) => (
          <Wordbox word={word} key={index} onFinish={handleFinish} active={index === 0} onMistake={handleMistake} />
        ))}
      </div>
    </div>
  );
};
export default Stage;