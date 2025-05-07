import React, { useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import { FaMicrophone, FaVolumeUp, FaExchangeAlt } from "react-icons/fa";

const Translator = () => {
  const [sourceLang, setSourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("ta");
  const [transcribedText, setTranscribedText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [isListening, setIsListening] = useState(false);

  let recognition;

  const startListening = () => {
    setIsListening(true);
    recognition = new window.webkitSpeechRecognition();
    recognition.lang = sourceLang;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = async (event) => {
      const speechText = event.results[0][0].transcript;
      setTranscribedText(speechText);

      try {
        const response = await axios.get(
          `https://api.mymemory.translated.net/get?q=${speechText}&langpair=${sourceLang}|${targetLang}`
        );

        setTranslatedText(response.data.responseData.translatedText);
      } catch (error) {
        console.error("Translation error:", error);
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const speakText = () => {
    if ("speechSynthesis" in window) {
      let speech = new SpeechSynthesisUtterance(translatedText);
      speech.lang = targetLang;
      window.speechSynthesis.speak(speech);
    } else {
      alert("Speech synthesis not supported in this browser.");
    }
  };

  const swapLanguages = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 flex flex-col items-center p-5">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          Voice Translator
        </h1>

        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Source Language
              </label>
              <select
                value={sourceLang}
                onChange={(e) => setSourceLang(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="en">English</option>
                <option value="fr">French</option>
                <option value="es">Spanish</option>
                <option value="de">German</option>
                <option value="hi">Hindi</option>
              </select>
            </div>

            <button
              onClick={swapLanguages}
              className="self-end p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <FaExchangeAlt className="text-xl" />
            </button>

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Language
              </label>
              <select
                value={targetLang}
                onChange={(e) => setTargetLang(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="en">English</option>
                <option value="fr">French</option>
                <option value="es">Spanish</option>
                <option value="de">German</option>
                <option value="hi">Hindi</option>
              </select>
            </div>
          </div>

          <button
            onClick={startListening}
            className={`w-full p-4 text-white rounded-lg flex items-center justify-center ${
              isListening ? "bg-red-500" : "bg-blue-500"
            } hover:bg-blue-600 transition-colors`}
          >
            <FaMicrophone className="mr-2" />
            {isListening ? "Listening..." : "Start Recording"}
          </button>

          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              You said:
            </h2>
            <p className="p-4 bg-gray-100 text-gray-800 rounded-lg">
              {transcribedText}
            </p>

            <h2 className="text-lg font-semibold text-gray-700 mt-4 mb-2">
              Translated:
            </h2>
            <div className="flex items-center justify-between p-4 bg-green-100 text-gray-800 rounded-lg">
              <p>{translatedText}</p>
              <button
                onClick={speakText}
                className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                <FaVolumeUp className="text-xl" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Translator;
