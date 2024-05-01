// Initialisierung der Image Classifier-Methode mit MobileNet und einem Callback
let classifier;
let img;
let thumbnail;
let resultDiv;

function preload() {
  classifier = ml5.imageClassifier('MobileNet');
}

function setup() {
  // Canvas erstellen
  createCanvas(400, 400);

  // Drag-and-Drop Bereich konfigurieren
  let dropZone = select('#drop_zone');
  dropZone.drop(gotFile);

  // Ergebnisanzeige erstellen
  resultDiv = select('#result');

  // Button zum manuellen Starten der Klassifizierung
  let classifyButton = select('button');
  classifyButton.style('display', 'block');
  classifyButton.style('margin-top', '20px');
}

// Funktion, die aufgerufen wird, wenn das Bild hochgeladen wird
function gotFile(file) {
  if (file.type === 'image') {
    // Das Bild als p5.Image-Objekt laden
    loadImage(file.data, function (loadedImage) {
      // Bild skalieren, um als Miniaturbild angezeigt zu werden
      thumbnail = createImg(loadedImage, 'Thumbnail');
      thumbnail.size(100, 100);
      thumbnail.parent('thumbnail'); // Das Thumbnail in das entsprechende Div einfügen

      // Klassifizierung des Bildes aufrufen
      img = loadedImage;
      classifier.classify(img, gotResult);
    });
  } else {
    console.log('Es wurde keine Bilddatei hochgeladen.');
  }
}

// Funktion, die aufgerufen wird, wenn der "Klassifizieren" Button geklickt wird
function classifyImage() {
  if (img) {
    classifier.classify(img, gotResult);
  } else {
    console.log('Es wurde noch kein Bild hochgeladen.');
  }
}

// Funktion, die aufgerufen wird, wenn die Klassifizierungsergebnisse erhalten werden
function gotResult(error, results) {
  if (error) {
    console.error(error);
  } else {
    // Ergebnis anzeigen
    resultDiv.html(`<strong>Label:</strong> ${results[0].label}<br><strong>Confidence:</strong> ${nf(results[0].confidence, 0, 2)}`);
  }
}

// Funktionen für Drag-and-Drop Interaktionen
function highlight() {
  select('#drop_zone').addClass('highlight');
  select('#drop_zone').html('<p>Drop here</p>');
}

function unhighlight() {
  select('#drop_zone').removeClass('highlight');
  select('#drop_zone').html('<p>Drag and Drop</p>');
}

// Verhindern des Standardverhaltens beim Drag-and-Drop
window.ondragover = function (e) {
  e.preventDefault();
  return false;
};
window.ondrop = function (e) {
  e.preventDefault();
  return false;
};
