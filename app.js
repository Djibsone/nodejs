const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

// Création de la connexion à la base de données
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'djibril',
  password: 'tamou',
  database: 'app_node'
});

// Connexion à la base de données
connection.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données : ' + err.stack);
    return;
  }
  console.log('Connexion à la base de données établie avec succès.');
});

// Configuration de l'application Express
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Route pour gérer la soumission du formulaire
app.post('/inscription', (req, res) => {
  const nom = req.body.nom;
  const prenom = req.body.prenom;
  const email = req.body.email;
  const password = req.body.password;

  // Insertion des données dans la base de données
  const sql = `INSERT INTO users (nom, prenom, email, password) VALUES (?, ?, ?, ?)`;
  connection.query(sql, [nom, prenom, email, password], (err, result) => {
    if (err) {
      console.error('Erreur lors de l\'insertion des données dans la base de données : ' + err.stack);
      res.status(500).send('Erreur lors de l\'inscription. Veuillez réessayer plus tard.');
      return;
    }

    console.log('Utilisateur inscrit avec succès.');

    // Redirection de l'utilisateur vers une page de confirmation
    res.redirect('/confirmation');
  });
});

// Démarrage du serveur
app.listen(3000, () => {
  console.log('Serveur démarré sur le port 3000.');
});
