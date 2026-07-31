class Scene {
  constructor(id, text, choices, isEnding = false) {
    this.id = id;
    this.text = text;
    this.choices = choices;
    this.isEnding = isEnding;
  }
}

async function loadStory() {
  const response = await fetch('story.json');
  const rawData = await response.json();

  const scenes = {};

  Object.entries(rawData).forEach(([id, sceneData]) => {
    const scene = new Scene(id, sceneData.text, sceneData.choices, sceneData.isEnding);
    scenes[id] = scene;
  });

  return scenes;
}

// Node 專屬語法，不在瀏覽器環境執行
if (typeof module !== 'undefined') {
  module.exports = { Scene, loadStory };
}
