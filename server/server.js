const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const uuid = require("uuid");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

const port = 5000;

app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  host: "smtp.office365.com", // serveur SMTP
  port: 587, // le port SMTP approprié
  secure: false,

  auth: {
    user: "jihentrabelsi23@outlook.com", // Remplacez par votre adresse e-mail
    pass: "nejahjihen1234", // Remplacez par votre mot de passe
  },
});
// Configuration de la connexion MySQL
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "intervention",
});

// Connexion à la base de données MySQL
connection.connect((err) => {
  if (err) {
    console.error("Erreur de connexion à la base de données :", err);
  } else {
    console.log("Connexion à la base de données MySQL réussie !");
  }
});


app.post("/inscription", (req, res) => {
  email = req.body.email;
  nom = req.body.nom;
  prenom = req.body.prenom;
  password = req.body.password;
  const currentDate = new Date();
  var formattedDate = currentDate.toISOString().slice(0, 19).replace("T", " ");

  const activationToken = jwt.sign(
    { email: email, nom: nom, prenom: prenom },
    "process.env.JWT_SECRET_KEY"
  );

  const { telephone } = req.body;
  console.log(email);

  // Requête pour vérifier si l'e-mail existe déjà
  const checkQuery = `SELECT COUNT(*) AS count, datesup FROM utilisateurs WHERE email = '${email}'`;

  // Exécution de la requête pour vérifier si l'e-mail existe déjà
  connection.query(checkQuery, (err, result) => {
    if (err) {
      console.error("Erreur lors de la vérification de l'e-mail :", err);
      // res.sendStatus(500);
    } else {
      const count = result[0].count;
      console.log("dateSupp");
      var dateSup = result[0].datesup;

      console.log(result[0].datesup);
      if (dateSup !== null) {
        console.log("entezz dans if");
        // const dateSup = result[0].datesup;
        var dateSupFinal = dateSup.setDate(dateSup.getDate() + 14);
        dateSupFinal = new Date(dateSupFinal);
        console.log("apres ajout");
        console.log(dateSupFinal);
        console.log("dateAuj");
        formattedDate = new Date(formattedDate);
        console.log(formattedDate);
      }
      console.log(formattedDate > dateSupFinal);
      // Vérification du nombre d'enregistrements
      if (
        (count > 0 && dateSup === null) ||
        (count > 0 && dateSup != null && formattedDate < dateSupFinal)
      ) {
        // L'e-mail existe déjà, afficher un message d'erreur
        console.log("L'e-mail existe déjà !");
        res.status(409).json({
          success: true,
          message: "Une erreur email existee.",
        });
      } else if (count > 0 && dateSup != null && formattedDate > dateSupFinal) {
        console.log("condd verifiz");
        const mailOptions = {
          from: "jihentrabelsi23@outlook.com", // Remplacez par votre adresse e-mail
          to: email,
          subject: "Inscription réussie",
          text: `Vous êtes maintenant inscrit votre mot de passe est ${password}  Cliquez ici pour changer votre mot de passe : http://localhost:3000/changePassword/${activationToken}`,
        };

        bcrypt.hash(password, 10, (err, hashedPassword) => {
          console.log("hash");
          if (err) {
            console.error("Erreur lors du hachage du mot de passe");
          } else {
            console.log("on va faire MSAJ");
            //  Stockez le mot de passe haché dans la base de données ou effectuez d'autres opérations
            const insertQuery = `UPDATE utilisateurs SET nom=?, prenom=?, telephone=?, password=?, active=1, datesup=? WHERE email=?`;
            const values = [
              nom,
              prenom,
              telephone,
              hashedPassword,
              null,
              email,
            ];

            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                console.error("Erreur lors de l'envoi de l'e-mail :", error);
                res.sendStatus(503);
              } else {
                console.log("E-mail envoyé avec succès :", info.response);
                // res.send("Le formulaire a été envoyé avec succès !");

                connection.query(
                  
                  
                  
                  insertQuery, values, (err, result) => {
                  if (err) {
                    console.error(
                      "Erreur lors de l'enregistrement des données du client :",
                      err
                    );

                    res.status(500).json({
                      success: true,
                      message:
                        "Erreur lors de l'enregistrement des données du client",
                    });
                  } else {
                    console.log("Données du client enregistrées avec succès !");

                    res.status(200).json({
                      success: true,
                      message:
                        "Formulaire bien soumis , veuillez vérifier votre mail !",
                      activationToken,
                    });
                  }
                });
              }
            });
          }
        });
      } else {
        console.log("vous etes en else");
        const mailOptions = {
          from: "jihentrabelsi23@outlook.com", // Remplacez par votre adresse e-mail
          to: email,
          subject: "Inscription réussie",
          text: `Vous êtes maintenant inscrit votre mot de passe est ${password}  Cliquez ici pour changer votre mot de passe : http://localhost:3000/changePassword/${activationToken}`,
        };

        bcrypt.hash(password, 10, (err, hashedPassword) => {
          if (err) {
            console.error("Erreur lors du hachage du mot de passe");
          } else if (count == 0 && dateSup === null) {
            console.log("on va faire l'insertionn");
            //  Stockez le mot de passe haché dans la base de données ou effectuez d'autres opérations
            const insertQuery = `INSERT INTO utilisateurs (email, nom, prenom, telephone, password,active,IdRole) VALUES (?, ?, ?, ?, ?, ?, ?)`;
            const values = [email, nom, prenom, telephone, hashedPassword, 1, 15];

            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                console.error("Erreur lors de l'envoi de l'e-mail :", error);
                res.sendStatus(503);
              } else {
                console.log("E-mail envoyé avec succès :", info.response);
                // res.send("Le formulaire a été envoyé avec succès !");

                connection.query(insertQuery, values, (err, result) => {
                  if (err) {
                    console.error(
                      "Erreur lors de l'enregistrement des données du client :",
                      err
                    );

                    res.status(500).json({
                      success: true,
                      message:
                        "Erreur lors de l'enregistrement des données du client",
                    });
                  } else {
                    console.log("Données du client enregistrées avec succès !");

                    res.status(200).json({
                      success: true,
                      message:
                        "Formulaire bien soumis , veuillez vérifier votre mail !",
                      activationToken,
                    });
                  }
                });
              }
            });
          }
        });
      }
    }
  });
});

app.get("/changePassword/:activationToken", (req, res) => {
  const activationToken = req.params.activationToken;

  console.log(activationToken);
  jwt.verify(activationToken, "process.env.JWT_SECRET_KEY", (err, decoded) => {
    if (err) {
      console.error("Erreur lors de la vérification du token :", err);
      res.status(400).json({ success: false, message: "Token invalide" });
      return;
    }

    // Extraire l'email du token décrypté
    const email = decoded.email;
    // MySQL query to retrieve client information based on token
    const query = `SELECT * FROM utilisateurs WHERE email = '${email}'`;

    // Execute the query
    connection.query(query, (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res
          .status(500)
          .json({ success: false, message: "Internal Server Error" });
        return;
      }

      if (results.length > 0) {
        const client = results[0];

        res.json({ success: true, data: client });
      } else {
        res.status(404).json({ success: false, message: "email is invalid." });
      }
    });
  });
});

app.put("/updatePassword/:activationToken", (req, res) => {
  const activationToken = req.params.activationToken;
  const password = req.body.password;
  const passwordConfirm = req.body.passwordConfirm;
  const clickedBtn = req.body.submitBtn;

  if (clickedBtn === "update") {
    if (password === passwordConfirm) {
      // Ajouter une condition pour vérifier la longueur minimale et la présence de majuscules et minuscules
      if (
        password.length >= 8 &&
        /[a-z]/.test(password) &&
        /[A-Z]/.test(password)
      ) {
        // Le mot de passe respecte les critères de longueur et de composition

        bcrypt.hash(password, 10, (err, hashedPassword) => {
          if (err) {
            console.error("Erreur lors du hachage du mot de passe :", err);
            res.status(500).json({
              message: "Erreur lors de la mise à jour du mot de passe",
            });
            return;
          }

          jwt.verify(
            activationToken,
            "process.env.JWT_SECRET_KEY",
            (err, decoded) => {
              if (err) {
                console.error("Erreur lors de la vérification du token :", err);
                res
                  .status(400)
                  .json({ success: false, message: "Token invalide" });
                return;
              }

              // Extraire l'email du token décrypté
              const email = decoded.email;

              // MySQL query to update the password and user ID for the client based on the activation token
              const query = `UPDATE utilisateurs SET password = '${hashedPassword}' WHERE email = '${email}'`;

              // Execute the query
              connection.query(query, (err, results) => {
                if (err) {
                  console.error(
                    "Erreur lors de l'exécution de la requête MySQL :",
                    err
                  );
                  res.status(500).json({
                    message: "Erreur lors de la mise à jour du mot de passe",
                  });
                  return;
                }

                if (results.affectedRows > 0) {
                  // Password update successful
                  res.json({
                    success: true,
                    message: "Mot de passe mis à jour avec succès.",
                  });
                } else {
                  // Return an error if the token is not found in the client table
                  res.status(404).json({
                    success: false,
                    message: "Le token est invalide.",
                  });
                }
              });
            }
          );
        });
      } else {
        res.status(400).json({
          message:
            "Le mot de passe doit comporter au moins 8 caractères et contenir au moins une lettre majuscule et une lettre minuscule.",
        });
      }
    } else {
      res
        .status(400)
        .json({ message: "Les mots de passe ne correspondent pas" });
    }
  } else {
    res.status(200).json({ success: true, message: "Annulation." });
    console.log("annule appuye");
  }
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  var activeAccount = true;

  const currentDate = new Date();
  var formattedDate = currentDate.toISOString().slice(0, 19).replace("T", " ");

  // const query = `SELECT COUNT(*), password , nom , prenom , telephone , active , datesup AS count ,password ,nom, prenom, telephone , active ,datesup FROM client WHERE email = '${email}'`;
  const query = `SELECT COUNT(*) as count, password, nom, prenom, telephone, active, datesup,IdRole FROM utilisateurs WHERE email = '${email}'`;

  console.log(email);

  connection.query(query, async (err, result) => {
    if (err) {
      console.error("Erreur lors de la vérification de l'email :", err);
      res.sendStatus(500);
      return;
    }

    const count = result[0].count;
    var dateSup = result[0].datesup;

    if (result[0].datesup !== null) {
      console.log("je lis a partir de bd");
      result[0].datesup = new Date(result[0].datesup);

      console.log(result[0].datesup);

      // Convertir datesup en format ISO 8601


      result[0].datesup.setDate(result[0].datesup.getDate() + 14);

      // Convertir formattedDate en format ISO 8601
      formattedDate = new Date(formattedDate);

     
      if (result[0].datesup < formattedDate) {
        console.log("interieur de if");
        activeAccount = false;
      }
    }

    if (activeAccount == false) {
      console.log("compte inactiif");
      // L'email n'existe pas dans la table client
      res.status(404).json({
        success: false,
        message: "Email ou mot de passe invalide ",
      });
    } else if (
      count == null ||
      count === 0 ||
      !(await bcrypt.compare(password, result[0].password))
    ) {
      console.log("erreur compte invalide");
      res.status(404).json({
        success: false,
        message: "Email ou mot de passe invalide ",
      });
    } else {
      const clientData = {
        email: email,
        nom: result[0].nom,
        prenom: result[0].prenom,
        telephone: result[0].telephone,
        datesup: result[0].datesup,
        active: result[0].active,
        activeAccount: activeAccount,
        IdRole:result[0].IdRole,
      };
      const activationToken = jwt.sign(
        { clientData: clientData },
        "process.env.JWT_SECRET_KEY"
      );
   

      res.cookie("token", activationToken); // 7 jours d'expiration

      res.status(200).json({
        success: true,
        message: "ça va ",
        token: activationToken,
      });
    }
  });
});

app.post("/reset_password", (req, res) => {
  const email = req.body.email;
  console.log("vous avez oublie votre mp");
  console.log(email);
  if (!email) {
    res.status(405).json({
      success: false,
      message: "veuillez saisir votre adresse mail",
    });
  } else {
    const checkEmailQuery = `SELECT * FROM utilisateurs WHERE email = '${email}'`;

    connection.query(checkEmailQuery, [email], (err, rows) => {
      if (err) {
        console.error(
          "Erreur lors de la recherche de l'email dans la table client :",
          err
        );
        res.status(500).json({
          success: false,
          message:
            "Erreur lors de la recherche de l'email dans la table client",
        });
      } else {
        if (rows.length === 0) {
          // L'email n'existe pas dans la table client
          res.status(404).json({
            success: false,
            message: "L'email n'existe pas",
          });
        } else {
          console.log("essai d'envoi");
          const activationToken = jwt.sign(
            { email: email },
            "process.env.JWT_SECRET_KEY",
            { expiresIn: "4m" }
          );

          const mailOptions = {
            from: "jihentrabelsi23@outlook.com", // Remplacez par votre adresse e-mail
            to: email,
            subject: "Reinitialisation de mot de passe",
            text: `
            Nous avons appris que vous avez perdu votre mot de passe. Désolé pour ça!
            Mais ne vous inquiétez pas ! Vous pouvez utiliser le lien suivant pour réinitialiser votre mot de passe : http://localhost:3000/changePassword/${activationToken}`,
          };

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error("Erreur lors de l'envoi de l'e-mail :", error);
              res.sendStatus(503);
            } else {
              console.log("E-mail envoyé avec succès :", info.response);
              res.status(200).json({
                success: true,
                message:
                  "Email de reinitialisation bien envoyé, veuillez vérifier votre mail !",
                activationToken,
              });
            }
          });
        }
      }
    });
  }
});

// ...

app.get("/userdetails", (req, res) => {
  console.log("userDetails");
  let token;
  var dateSup = null;
  const currentDate = new Date();
  var formattedDate = currentDate.toISOString().slice(0, 19).replace("T", " ");

  formattedDate = new Date(formattedDate);

  // Vérifier si le jeton JWT est inclus dans les en-têtes de la requête
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // Si le jeton JWT n'est pas trouvé, renvoyer une erreur
  if (!token) {
    return res
      .status(401)
      .json({ message: "Authentification requise. Jeton manquant." });
  }

  try {
    // Vérifier le jeton JWT et décoder les données du client
    const decoded = jwt.verify(token, "process.env.JWT_SECRET_KEY"); // Remplacez "votre_clé_secrète" par votre clé secrète pour la signature du token

    const emailAdress = decoded.clientData.email;
    console.log("adresse connecte est");
    console.log(emailAdress);
    dateSup = decoded.clientData.datesup;

    dateSup = new Date(dateSup);

    if (dateSup !== null) {
      var differenceInMilliseconds =
        dateSup.getTime() - formattedDate.getTime();
      differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);

      console.log(differenceInDays);
      const remainingMilliseconds =
        differenceInMilliseconds % (1000 * 60 * 60 * 24);

      differenceInHours = Math.floor(remainingMilliseconds / (1000 * 60 * 60));
      console.log(differenceInHours);
      differenceInHours = Math.floor(remainingMilliseconds / (1000 * 60 * 60));
      differenceInDays = Math.floor(differenceInDays);
      differenceInHours = Math.floor(differenceInHours);
    }

    // Exécuter la requête SQL pour récupérer les détails du client en fonction de l'adresse e-mail
    const query = `SELECT * FROM utilisateurs WHERE email = '${emailAdress}'`;
    connection.query(query, (error, results) => {
      if (error) {
        console.error(error);
        return res
          .status(500)
          .send(
            "Une erreur s'est produite lors de la vérification de l'utilisateur"
          );
      } else if (results.length === 0) {
        // Si aucun client n'est trouvé avec l'adresse e-mail donnée, renvoyer une réponse vide
        return res.status(404).json({ message: "Client non trouvé" });
      } else {
        console.log(results[0]);
        const responseData = {
          client: results[0],
          differenceInDays: differenceInDays,
          differenceInHours: differenceInHours,
        };
        res.status(200).json(responseData);
      }
    });
  } catch (error) {
    // En cas d'erreur de vérification du jeton JWT (par exemple, jeton expiré ou invalide), renvoyer une erreur d'authentification
    return res
      .status(401)
      .json({ message: "Authentification invalide. Jeton non valide." });
  }
});

app.post("/confirmSuppression", (req, res) => {
  const clickedBtn = req.body.clickedBtn;

  const email = req.body.email;
  console.log(clickedBtn);
  if (clickedBtn == "annuler") {
    res.status(203).json({
      success: true,
      message: "annulé !",
    });
  } else {
    const currentDate = new Date();

    const formattedDate = currentDate
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    console.log("date insere dans la bd ");
    console.log(formattedDate);

    const query = `UPDATE utilisateurs SET active = 0, datesup = '${formattedDate}' WHERE email = '${email}'`;
    connection.query(query, (err, result) => {
      if (err) {
        console.error(
          "Erreur lors de l'enregistrement des données du client :",
          err
        );

        res.status(500).json({
          success: true,
          message: "Erreur lors de l'enregistrement des données du client",
        });
      } else {
        console.log("Données du client enregistrées avec succès !");

        res.status(200).json({
          success: true,
          message: "suppression reussite !",
        });
      }
    });
  }
});

app.put("/recuperer_compte", (req, res) => {
  const email = req.body.email;
  const clickedBtn = req.body.clickedBtn;
  console.log(clickedBtn);

  if (clickedBtn === "annuler") {
    res.status(203).json({
      success: true,
      message: "Opération annulée !",
    });
  } else {
    const query = `UPDATE utilisateurs SET active = 1, datesup = NULL WHERE email = '${email}'`;
    connection.query(query, (err, result) => {
      if (err) {
        console.error("Erreur lors de la mise à jour", err);

        res.status(500).json({
          success: true,
          message: "Erreur lors de l'enregistrement des données du client",
        });
      } else {
        console.log("Données du client enregistrées avec succès !");

        res.status(200).json({
          success: true,
          message: "Réinitialisation réussie !",
        });
      }
    });
  }
});
app.put("/UserEdit", (req, res) => {
  console.log("entree edit");
  const email = req.body.email;
  console.log(email);
  const nom = req.body.nom;
  const prenom = req.body.prenom;
  console.log(prenom);
  const tel = req.body.telephone;

  const query = `UPDATE utilisateurs SET nom='${nom}', prenom='${prenom}',telephone='${tel}' WHERE email='${email}'`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error executing MySQL query:", err);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
      return;
    } else {
      res
        .status(200)
        .json({ success: true, message: "Les données sont bien modifiées." });
    }
  });
});
//CAT001
app.get("/claim", (req, res) => {
  console.log("claim");
  const query = `SELECT Choix,idChoix from choix where idGroupe='CAT001'`;
  connection.query(query, (err, results) => {
    if (err) {
      return;
    }

    if (results.length > 0) {
      console.log(results);
    } else {
    }
    const queryCategorie = `SELECT Choix,idChoix from choix where idGroupe='CAT003'`;
    connection.query(queryCategorie, (err, results1) => {
      if (err) {
        console.log(err);
        return;
      }
      if (results1.length > 0) {
        console.log("testt cat");
        console.log(results1);
      } else {
        console.log("000");
      }

      const combinedData = { data: results, data1: results1 };
      res.json({
        success: true,
        data: combinedData,
        message: "Données récupérées avec succès.",
      });
    });
  });
});
app.post("/claim", (req, res) => {
  const currentStatus = 6;
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString(); // Format ISO 8601
  console.log(formattedDate);
  const emailAdress = req.body.clientEmail;
  console.log(emailAdress);
  const object = req.body.object;
  const selectedCategory = req.body.selectedCategory;
  console.log(selectedCategory);
  console.log(object);
  const selectedPriority = req.body.selectedPriority;
  console.log(selectedPriority);
  const insertQuery = `INSERT INTO reclamations  (Objet, idCategorie, IdPriorite, DateReclamation, idStatut,emailClient) VALUES (?, ?, ?, ?, ?, ?)`;
  const values = [
    object,
    selectedCategory,
    selectedPriority,
    formattedDate,
    currentStatus,
    emailAdress,
  ];

  connection.query(insertQuery, values, (err, results) => {
    if (err) {
      console.error("Error executing MySQL query:", err);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
      return;
    } else {
      res
        .status(200)
        .json({ success: true, message: "reclamation bien ajouté" });
    }
  });
});

app.get("/reclamations",(req,res)=>{
  const { email } = req.query;
const query = `
  SELECT r.Objet, r.idCategorie, r.idPriorite, r.DateReclamation, r.IdStatut, c.Choix AS statut, p.Choix AS priorite, cat.Choix AS categorie
  FROM reclamations r
  LEFT JOIN choix c ON r.IdStatut = c.idChoix
  LEFT JOIN choix p ON r.idPriorite = p.idChoix
  LEFT JOIN choix cat ON r.idCategorie = cat.idChoix
  WHERE r.emailClient = '${email}'
`;  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error executing MySQL query:", err);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
      return;
    } else {
      res
        .status(200)
        .json({ success: true, message: "reclamation bien ajouté",data:results});
        console.log("vocii");
        console.log(results);
    }
  });})

  // app.get("/count",(req,res)=>{
   
  //   const query=`SELECT count(*)  AS count from reclamations where emailClient='${email}'`;
  //   connection.query(query, (err, result) => {
  //     if (err) {
       

  //       res.status(500).json({
  //         success: true,
  //         message:
  //           "Erreur ",
  //       });
  //     } else {
  //       console.log("count (*) reussi !");

  //       const messageCount = result[0].count;
  //     res.json({ count: messageCount });
  //       console.log(result);
  //     }
  //   });
  // })



  app.post("/admin/add_technician" ,(req,res)=>{
    console.log("postt");
    const { email, nom, prenom, telephone,password,selectedFunction } = req.body;
    console.log(email);
    console.log(nom);
    console.log(password);
    console.log(selectedFunction)
    








    const currentDate = new Date();
  var formattedDate = currentDate.toISOString().slice(0, 19).replace("T", " ");

  const activationToken = jwt.sign(
    { email: email, nom: nom, prenom: prenom },
    "process.env.JWT_SECRET_KEY"
  );


  // Requête pour vérifier si l'e-mail existe déjà
  const checkQuery = `SELECT COUNT(*) AS count, datesup FROM utilisateurs WHERE email = '${email}'`;

  // Exécution de la requête pour vérifier si l'e-mail existe déjà
  connection.query(checkQuery, (err, result) => {
    if (err) {
      console.error("Erreur lors de la vérification de l'e-mail :", err);
      // res.sendStatus(500);
    } else {
      const count = result[0].count;
      console.log("dateSupp");
      var dateSup = result[0].datesup;

      console.log(result[0].datesup);
      if (dateSup !== null) {
        console.log("entezz dans if");
        // const dateSup = result[0].datesup;
        var dateSupFinal = dateSup.setDate(dateSup.getDate() + 14);
        dateSupFinal = new Date(dateSupFinal);
        console.log("apres ajout");
        console.log(dateSupFinal);
        console.log("dateAuj");
        formattedDate = new Date(formattedDate);
        console.log(formattedDate);
      }
      console.log(formattedDate > dateSupFinal);
      // Vérification du nombre d'enregistrements
      if (
        (count > 0 && dateSup === null) ||
        (count > 0 && dateSup != null && formattedDate < dateSupFinal)
      ) {
        // L'e-mail existe déjà, afficher un message d'erreur
        console.log("L'e-mail existe déjà !");
        res.status(409).json({
          success: true,
          message: "Une erreur email existee.",
        });
      } else if (count > 0 && dateSup != null && formattedDate > dateSupFinal) {
        console.log("condd verifiz");
        const mailOptions = {
          from: "jihentrabelsi23@outlook.com", // Remplacez par votre adresse e-mail
          to: email,
          subject: "Inscription réussie",
          text: `Vous êtes maintenant inscrit votre mot de passe est ${password}  Cliquez ici pour changer votre mot de passe : http://localhost:3000/changePassword/${activationToken}`,
        };

        bcrypt.hash(password, 10, (err, hashedPassword) => {
          console.log("hash");
          if (err) {
            console.error("Erreur lors du hachage du mot de passe");
          } else {
            console.log("on va faire MSAJ");
            //  Stockez le mot de passe haché dans la base de données ou effectuez d'autres opérations
            const insertQuery = `UPDATE utilisateurs SET nom=?, prenom=?, telephone=?, password=?, active=1, datesup=? WHERE email=?`;
            const values = [
              nom,
              prenom,
              telephone,
              hashedPassword,
              null,
              email,
            ];

            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                console.error("Erreur lors de l'envoi de l'e-mail :", error);
                res.sendStatus(503);
              } else {
                console.log("E-mail envoyé avec succès :", info.response);
                // res.send("Le formulaire a été envoyé avec succès !");

                connection.query(insertQuery, values, (err, result) => {
                  if (err) {
                    console.error(
                      "Erreur lors de l'enregistrement des données du client :",
                      err
                    );

                    res.status(500).json({
                      success: true,
                      message:
                        "Erreur lors de l'enregistrement des données du client",
                    });
                  } else {
                    console.log("Données du client enregistrées avec succès !");

                    res.status(200).json({
                      success: true,
                      message:
                        "Technicien bien ajouté",
                      activationToken,
                    });
                  }
                });
              }
            });
          }
        });
      } else {
        console.log("vous etes en else");
        const mailOptions = {
          from: "jihentrabelsi23@outlook.com", // Remplacez par votre adresse e-mail
          to: email,
          subject: "Inscription réussie",
          text: `Vous êtes maintenant inscrit votre mot de passe est ${password}  Cliquez ici pour changer votre mot de passe : http://localhost:3000/changePassword/${activationToken}`,
        };

        bcrypt.hash(password, 10, (err, hashedPassword) => {
          if (err) {
            console.error("Erreur lors du hachage du mot de passe",err);
          } else if (count == 0 && dateSup === null) {
            console.log("on va faire l'insertionn");
            //  Stockez le mot de passe haché dans la base de données ou effectuez d'autres opérations
            const insertQuery = `INSERT INTO utilisateurs (email, nom, prenom, idFonction,telephone, password,active,IdRole) VALUES (?, ? ,?, ?, ?, ?, ?, ?)`;
            const values = [email, nom, prenom, selectedFunction ,telephone, hashedPassword, 1, 16];

            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                console.error("Erreur lors de l'envoi de l'e-mail :", error);
                res.sendStatus(503);
              } else {
                console.log("E-mail envoyé avec succès :", info.response);
                // res.send("Le formulaire a été envoyé avec succès !");

                connection.query(insertQuery, values, (err, result) => {
                  if (err) {
                    console.error(
                      "Erreur lors de l'enregistrement des données du client :",
                      err
                    );

                    res.status(500).json({
                      success: true,
                      message:
                        "Erreur lors de l'enregistrement des données du client",
                    });
                  } else {
                    console.log("Données du client enregistrées avec succès !");

                    res.status(200).json({
                      success: true,
                      message:
                        "Formulaire bien soumis , veuillez vérifier votre mail !",
                      activationToken,
                    });
                  }
                });
              }
            });
          }
        });
      }
    }
  });
    
  
  })


app.get("/admin/add_technician",(req,res)=>{

console.log("ajout tech");
const query = `SELECT Choix,idChoix from choix where idGroupe='FONCTION'`;
connection.query(query, (err, results) => {
  if (err) {
    console.error("Error executing MySQL query:", err);
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
    return;
  }

  if (results.length > 0) {

    res.json({ success: true, functions: results });
  } else {
    res.status(404).json({ success: false, message: "code is invalid." });
  }
});

})

// app.get("/admin/users_list",(req,res)=>{
//   console.log("je suis get");
//   const query="SELECT utilisateurs.nom, utilisateurs.prenom, choix.Choix AS fonction FROM utilisateurs JOIN choix ON utilisateurs.IdFonction = choix.idChoix";
  
//   connection.query(query, (err, results) => {
//     if (err) {
//       console.error("Error executing MySQL query:", err);
//       res
//         .status(500)
//         .json({ success: false, message: "Internal Server Error" });
//       return;
//     }
  
//     if (results.length > 0) {
//       console.log(results);
  
//       res.json({ success: true, userInfo: results });
//     } else {
//       res.status(404).json({ success: false, message: "code is invalid." });
//     }
//   });
// })




app.get("/admin/list/:userType",(req,res)=>{
  const userType = req.params.userType;
 if (userType==="techniciens") {

  console.log("je suis technicien");

  const query="SELECT utilisateurs.nom, utilisateurs.email ,utilisateurs.prenom, choix.Choix AS fonction FROM utilisateurs JOIN choix ON utilisateurs.IdFonction = choix.idChoix";
  
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error executing MySQL query:", err);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
      return;
    }
  
    if (results.length > 0) {
      console.log(results);
  
      res.json({ success: true, userInfo: results });
    } else {
      res.status(404).json({ success: false, message: "code is invalid." });
    }
  });
  
  
 }
  if(userType==="clients"){
  const idRole=15;
  console.log("je suis client");

  const query=`SELECT nom, prenom,email FROM utilisateurs where IdRole='${idRole}'`;
  
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error executing MySQL query:", err);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
      return;
    }
  
    if (results.length > 0) {
      console.log(results);
  
      res.json({ success: true, userInfo: results });
    } else {
      res.status(404).json({ success: false, message: "code is invalid." });
    }
  });
 }

})

app.get("/admin/userMoreDetails/:email",(req,res)=>{

const email=req.params.email;
console.log("je suiis le prop");
console.log(email);

const query=`SELECT utilisateurs.nom, utilisateurs.email, utilisateurs.IdRole,utilisateurs.active,utilisateurs.telephone,utilisateurs.datesup,utilisateurs.prenom FROM utilisateurs  WHERE email='${email}'`;
  
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error executing MySQL query:", err);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
      return;
    }
  
    if (results.length > 0) {
      console.log(results);
  
      res.json({ success: true, userDetails: results });
    } else {
      res.status(404).json({ success: false, message: "code is invalid." });
    }
  });
})

 
app.delete("/admin/confirm_delete/:email",(req,res)=>{
  const clickedBtn=req.query.clickedBtn;
  const emailToDelete=req.params.email;
  if (clickedBtn=="confirmation") {
    console.log("confirm d'operation");

    res.status(200).json({
      success: true,
      message: "confirme !",
    });
const deleteReclamationQuery = `DELETE FROM reclamations WHERE emailClient='${emailToDelete}' OR emailTechnicien='${emailToDelete}'`;
const deleteUtilisateursQuery = `DELETE FROM utilisateurs WHERE email='${emailToDelete}'`;
const insertHistoriqueQuery = `
  INSERT INTO historiques (Objet, emailClient, idCategorie, IdPriorite, DateReclamation, IdStatut, emailTechnicien)
  SELECT Objet, emailClient, idCategorie, IdPriorite, DateReclamation, IdStatut, emailTechnicien
  FROM reclamations
  WHERE emailClient='${emailToDelete}' OR emailTechnicien='${emailToDelete}'
`;
// Démarrer une transaction
connection.beginTransaction(function (err) {
  if (err) throw err;

  // Suppression de la table reclamation
  connection.query(insertHistoriqueQuery, function (err, reclamationResult) {
    if (err) {
      connection.rollback(function () {
        throw err;
      });
    }
    else{
      console.log(reclamationResult);
    }

    // Suppression de la table utilisateurs
    connection.query(deleteReclamationQuery, function (err, deleteResult) {
      if (err) {
        connection.rollback(function () {
          throw err;
        });
      }

      // Insertion dans la table historique
      connection.query(deleteUtilisateursQuery, function (err, insertResult) {
        if (err) {
          connection.rollback(function () {
            throw err;
          });
        }

        // Valider la transaction
        connection.commit(function (err) {
          if (err) {
            connection.rollback(function () {
              throw err;
            });
          }
          console.log("Opération de suppression et d'insertion réussie.");
        });
      });
    });
  });
});

  }

  else{
    console.log("annulee operation")
    res.status(203).json({
      success: true,
      message: "annulé !",
    });
  }
})



app.get("/admin/reclams/:reclamationType", (req,res)=>{
  const enCoursCode=7;
  const enAttenteCode=6;
  const clotureCode=5;
  const {selectedCategory}=req.query;
  const {selectedPriority}=req.query;



  const reclamationType=req.params.reclamationType;
  console.log(reclamationType);

    var query = `
  SELECT r.IdReclamation, r.emailClient, r.Objet, r.idCategorie, r.idPriorite, r.DateReclamation, r.IdStatut,r.DateIntervention,
       c.Choix AS statut, p.Choix AS priorite, cat.Choix AS categorie,
       tech.Nom AS nomTechnicien, tech.Prenom AS prenomTechnicien,
       client.Nom AS nomClient, client.Prenom AS prenomClient
FROM reclamations r
LEFT JOIN choix c ON r.IdStatut = c.idChoix
LEFT JOIN choix p ON r.idPriorite = p.idChoix
LEFT JOIN choix cat ON r.idCategorie = cat.idChoix
LEFT JOIN utilisateurs tech ON r.emailTechnicien = tech.email
LEFT JOIN utilisateurs client ON r.emailClient = client.email`  ;



  
if (reclamationType === "inProgress") {
  query += ` WHERE r.IdStatut = ${enCoursCode}`;

  if (selectedCategory) {
    query += ` AND r.idCategorie = '${selectedCategory}'`;
  }

  if (selectedPriority) {
    query += ` AND r.idPriorite = '${selectedPriority}'`;
  }
}

else if(reclamationType==="archivees"){

     query = `
    SELECT h.IdReclamation, h.emailClient, h.Objet, h.idCategorie, h.idPriorite, h.DateReclamation, h.emailTechnicien ,h.IdStatut,h.DateIntervention,
         c.Choix AS statut, p.Choix AS priorite, cat.Choix AS categorie
  FROM historiques h
  LEFT JOIN choix c ON h.IdStatut = c.idChoix
  LEFT JOIN choix p ON h.idPriorite = p.idChoix
  LEFT JOIN choix cat ON h.idCategorie = cat.idChoix     WHERE 1=1

   `
    
  if (selectedCategory) {
    console.log("caaat");
    console.log(selectedCategory);
    query += ` AND h.idCategorie = '${selectedCategory}'`;
  }

  if (selectedPriority) {
    console.log("prioo");
    query += ` AND h.idPriorite = '${selectedPriority}'`;
  }
}


else if (reclamationType === "onHold") {
  query += ` WHERE r.IdStatut = ${enAttenteCode}`;

  if (selectedCategory) {
    query += ` AND r.idCategorie = '${selectedCategory}'`;
  }

  if (selectedPriority) {
    query += ` AND r.idPriorite = '${selectedPriority}'`;
  }
} else {
  query += ` WHERE r.IdStatut = ${clotureCode}`;

  if (selectedCategory) {
    query += ` AND r.idCategorie = '${selectedCategory}'`;
  }

  if (selectedPriority) {
    query += ` AND r.idPriorite = '${selectedPriority}'`;
  }
}



  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error executing MySQL query:", err);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
      return;
    }
  
    if (results.length > 0) {
      // console.log(results);
  
      res.json({ success: true, reclamations: results });
    } else {
      res.status(404).json({ success: false, message: "code is invalid." });
    }
  });
  

})





app.get("/technicien/interventions/:interventionType",(req,res)=>{
  const interventionType=req.params.interventionType;
  const {email}= req.query;
  const {selectedCategory}=req.query;
  const {selectedPriority}=req.query;
  console.log("typeInterv");

  const enCoursCode=7;
  const enAttenteCode=6;
  const clotureCode=5;

  console.log(interventionType);
  var query = `
  SELECT r.IdReclamation, r.emailClient, r.Objet, r.idCategorie, r.idPriorite, r.DateReclamation, r.DateIntervention, r.IdStatut,
         c.Choix AS statut, p.Choix AS priorite, cat.Choix AS categorie,
         client.Nom AS nomClient, client.Prenom AS prenomClient
  FROM reclamations r
  LEFT JOIN choix c ON r.IdStatut = c.idChoix
  LEFT JOIN choix p ON r.idPriorite = p.idChoix
  LEFT JOIN choix cat ON r.idCategorie = cat.idChoix
  LEFT JOIN utilisateurs client ON r.emailClient = client.email WHERE emailTechnicien='${email}'
  `;

  if (interventionType === "enCours") {
    query += ` AND r.IdStatut = '${enCoursCode}'`; // Utilisez AND au lieu de WHERE ici

    if (selectedCategory) {
      query += ` AND r.idCategorie = '${selectedCategory}'`;
    }

    if (selectedPriority) {
      query += ` AND r.idPriorite = '${selectedPriority}'`;
    }
  } else if (interventionType === "disponibles") {


     query = `
    SELECT r.IdReclamation, r.emailClient, r.Objet, r.idCategorie, r.idPriorite, r.DateReclamation, r.DateIntervention, r.IdStatut,
           c.Choix AS statut, p.Choix AS priorite, cat.Choix AS categorie,
           client.Nom AS nomClient, client.Prenom AS prenomClient
    FROM reclamations r
    LEFT JOIN choix c ON r.IdStatut = c.idChoix
    LEFT JOIN choix p ON r.idPriorite = p.idChoix
    LEFT JOIN choix cat ON r.idCategorie = cat.idChoix
    LEFT JOIN utilisateurs client ON r.emailClient = client.email
    `;
    console.log("je suis iciii");

    query += ` WHERE r.IdStatut = '${enAttenteCode}'`; // Utilisez AND au lieu de WHERE ici
    console.log(query);

    if (selectedCategory) {
      query += ` AND r.idCategorie = '${selectedCategory}'`;
    }

    if (selectedPriority) {
      query += ` AND r.idPriorite = '${selectedPriority}'`;
    }
  } else {
    query += ` AND r.IdStatut = '${clotureCode}'`; // Utilisez AND au lieu de WHERE ici

    if (selectedCategory) {
      query += ` AND r.idCategorie = '${selectedCategory}'`;
    }

    if (selectedPriority) {
      query += ` AND r.idPriorite = '${selectedPriority}'`;
    }
  }

  // Exécutez la requête avec le paramètre lié
  connection.query(query, (error, results, fields) => {
    if (error) throw error;

    // Traitez les résultats ici
    if (results.length > 0) {
      console.log(results[0]);

      res.json({ success: true, interventions: results });
    } else {
      res.status(404).json({ success: false, message: "code is invalid." });
    }
  });

})








  

app.put("/technicien/intervene/:idReclamation",(req,res)=>{
const idReclamation=req.params.idReclamation;
const idEnCours=7;
const currentDate = new Date();
  const formattedDate = currentDate.toISOString(); 
const technicianEmail=req.body.email;
console.log(technicianEmail);
console.log(idReclamation);
const query = `
  UPDATE reclamations
  SET IdStatut = ?, emailTechnicien = ?, DateIntervention = ?
  WHERE IdReclamation = ?
`;

const queryParams = [idEnCours, technicianEmail, formattedDate, idReclamation];
connection.query(query,queryParams ,(error, results) => {
  if (error) throw error;

  // Traitez les résultats ici
  if (results.length > 0) {
    console.log(results[0]);

    res.json({ success: true, reclamations: results });
  } else {
    res.status(404).json({ success: false, message: "code is invalid." });
  }
});
})





app.put("/technicien/update/:idReclamation", (req, res) => {
  const idEnAttente = 6;
  const idCloture = 5;
  console.log("j'ai fait msaj");
  const idReclamation = req.params.idReclamation;
  const technicianEmail = req.body.email;
  console.log(technicianEmail);
  console.log(idReclamation);
  const selectedBtn = req.body.btnName;
  console.log(selectedBtn);



if (selectedBtn == "Cloture") {
   const query1 = `SELECT emailClient,objet FROM reclamations WHERE IdReclamation='${idReclamation}'`;




    // Traitez les résultats ici
    
      connection.query(query1, (error1, results1) => {
        if (error1) throw error1;

        // Vérifiez si des résultats ont été obtenus
        if (results1.length > 0) {
          const emailClient = results1[0].emailClient;
          const object=results1[0].objet;
          console.log("finaluuuu email cluent est");
          console.log(emailClient);

          // res.json({ success: true, reclamations: results1 });
          const mailOptions = {
            from: "jihentrabelsi23@outlook.com",
            to: emailClient,
            subject: "Reclamation réussie",
            text: `Nous sommes ravis de vous informer que votre réclamation concernant '${object}' a été résolue avec succès. Nous avons pris toutes les mesures nécessaires pour résoudre le problème et nous sommes heureux de vous annoncer que tout est désormais en ordre.
            Nous tenons à vous remercier pour votre patience et votre compréhension pendant le traitement de cette réclamation. Votre satisfaction est notre priorité absolue, et nous espérons que cette résolution répond pleinement à vos attentes.`,
          };

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error("Erreur lors de l'envoi de l'e-mail :", error);
            } else {
              console.log("E-mail envoyé avec succès :", info.response);
              // res.send("Le formulaire a été envoyé avec succès !");
            }
          });
        } else {
        }
      });
    







    }
 

  if (selectedBtn == "Annuler") {

    const query = `UPDATE reclamations SET IdStatut='${idEnAttente}', emailTechnicien='null' WHERE IdReclamation='${idReclamation}'`;

    connection.query(query, (error, results) => {
      if (error) throw error;

      // Traitez les résultats ici
      if (results.length > 0) {
        console.log(results[0]);

        // res.json({ success: true, reclamations: results });
      } else {
        // res.status(404).json({ success: false, message: "code is invalid." });
      }
    });

  } else {

    const query = `UPDATE reclamations SET IdStatut='${idCloture}' WHERE IdReclamation='${idReclamation}'`;

    connection.query(query, (error, results) => {
      if (error) throw error;

      // Traitez les résultats ici
      if (results.length > 0) {
        console.log(results[0]);
   
      } else {
        // res.status(404).json({ success: false, message: "code is invalid." });
      }
    });

  }
});

 
  app.get("/categories",(req,res)=>{
    console.log("je suis filtre");
    const categoryCode="CAT003";
    const query=`SELECT Choix,idChoix from choix where IdGroupe='${categoryCode}'`
    connection.query(query, (error, results) => {
      if (error) throw error;
    
      // Traitez les résultats ici
      if (results.length > 0) {
        console.log(results[0]);
    
        res.json({ success: true, categories: results });
      } else {
        res.status(404).json({ success: false, message: "code is invalid." });
      }
    });
  })


  app.get("/functions",(req,res)=>{
    console.log("je suis functionns");
    const functionCode="FONCTION";
    const query=`SELECT Choix,idChoix from choix where IdGroupe='${functionCode}'`
    connection.query(query, (error, results) => {
      if (error) throw error;
    
      // Traitez les résultats ici
      if (results.length > 0) {
        console.log(results[0]);
    
        res.json({ success: true, functions: results });
      } else {
        res.status(404).json({ success: false, message: "code is invalid." });
      }
    });
  })


  app.get("/priorities",(req,res)=>{
    console.log("je suis par priorte");
    const priorityCode="CAT001";
    const query=`SELECT Choix,idChoix from choix where IdGroupe='${priorityCode}'`
    connection.query(query, (error, results) => {
      if (error) throw error;
    
      // Traitez les résultats ici
      if (results.length > 0) {
        console.log(results[0]);
    
        res.json({ success: true, priorities: results });
      } else {
        res.status(404).json({ success: false, message: "code is invalid." });
      }
    });
  })



app.get("/admin/countClient", (req,res)=>{

  const idClient=15;

    const query=`SELECT count(*)  AS count from utilisateurs where IdRole='${idClient}'`;
    connection.query(query, (err, result) => {
      if (err) {
       

        res.status(500).json({
          success: true,
          message:
            "Erreur ",
        });
      } else {

        const messageCount = result[0].count;
      res.json({ countClient: messageCount });
   
      }
    });
})

app.get("/admin/countTechnician", (req,res)=>{

  const idTechnician=16;

    const query=`SELECT count(*)  AS count from utilisateurs where IdRole='${idTechnician}'`;
    connection.query(query, (err, result) => {
      if (err) {
       

        res.status(500).json({
          success: true,
          message:
            "Erreur ",
        });
      } else {

        const messageCount = result[0].count;
      res.json({ countTechnician: messageCount });
 
      }
    });
})

app.get("/admin/countReclams",(req,res)=>{

  const idEnAttente=6;

    const query=`SELECT count(*)  AS count from reclamations where IdStatut='${idEnAttente}'`;
    connection.query(query, (err, result) => {
      if (err) {
       

        res.status(500).json({
          success: true,
          message:
            "Erreur ",
        });
      } else {

        const messageCount = result[0].count;
      res.json({ countReclams: messageCount });

      }
    });
})

app.get("/admin/countInterventions", (req,res)=>{

  console.log("drrr");
  const idResolved=5;

    const query=`SELECT count(*)  AS count from reclamations where IdStatut='${idResolved}'`;
    connection.query(query, (err, result) => {
      if (err) {
       

        res.status(500).json({
          success: true,
          message:
            "Erreur ",
        });
      } else {

        const messageCount = result[0].count;
      res.json({ countInterventions: messageCount });
      
      }
    });
})


app.get("/admin/countReclamsInProgress",  (req, res) => {
  const idInProgress = 7;

  const query = `
    SELECT 
      objet,
      clients.nom AS client_nom,
      clients.prenom AS client_prenom,
      techniciens.nom AS technicien_nom,
      techniciens.prenom AS technicien_prenom
    FROM 
      reclamations
    JOIN 
      utilisateurs AS clients ON reclamations.emailClient = clients.email
    JOIN 
      utilisateurs AS techniciens ON reclamations.emailTechnicien = techniciens.email
    WHERE 
      reclamations.IdStatut = '${idInProgress}'
    LIMIT 3; 
  `;

  const countQuery = `
    SELECT COUNT(*) AS totalCount
    FROM reclamations
    WHERE IdStatut = '${idInProgress}';
  `;

  connection.query(query, (err, result) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "Erreur lors de la récupération des réclamations en cours.",
      });
    } else {
      connection.query(countQuery, (countErr, countResult) => {
        if (countErr) {
          res.status(500).json({
            success: false,
            message: "Erreur lors de la récupération du nombre total de réclamations en cours.",
          });
        } else {
          const totalCount = countResult[0].totalCount;

          res.json({
            totalCount,
            reclamsInProgress: result,
          });
        }
      });
    }
  });
});



app.get("/admin/achievedInterventions",(req,res)=>{

  const idResolved=5;

    const query=`SELECT count(*)  AS count from reclamations where IdStatut='${idResolved}'`;
    connection.query(query, (err, result) => {
      if (err) {
       

        res.status(500).json({
          success: true,
          message:
            "Erreur ",
        });
      } else {

        const messageCount = result[0].count;
      res.json({ countInterventions: messageCount });
      
      }
    });
})

app.post("/admin/add_category",(req,res)=>{


  const categoryTitle=req.body.categoryTitle;
  const insertQuery = `INSERT INTO Choix (Choix, idGroupe) VALUES (?, ?)`;
  const values = [categoryTitle, 'CAT003'];

  connection.query(insertQuery, values, (err, results) => {
    if (err) {
      console.error("Error executing MySQL query:", err);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
      return;
    } else {
      res
        .status(200)
        .json({ success: true, message: "catégorie bien ajoutée !" });
    }
  });


})


app.post("/admin/add_function",(req,res)=>{


  const functionTitle=req.body.functionTitle;
  const insertQuery = `INSERT INTO Choix (Choix, idGroupe) VALUES (?, ?)`;
  const values = [functionTitle, 'FONCTION'];

  connection.query(insertQuery, values, (err, results) => {
    if (err) {
      console.error("Error executing MySQL query:", err);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
      return;
    } else {
      res
        .status(200)
        .json({ success: true, message: "fonction bien ajoutée !" });
    }
  });


})

app.delete("/admin/categoryDelete/:btnValue" ,(req,res)=>{
  const btnValue=req.params.btnValue;
  console.log(btnValue);

  const deleteQuery = `DELETE FROM Choix WHERE idChoix =${btnValue}`;
  connection.query(deleteQuery, (err, result) => {
    if (err) {
      console.error('Erreur lors de la suppression des données :', err);
      return;
    }
    else{  res
      .status(200)
      .json({ success: true, message: "données utilisateur bien mises à" });}



    
    
  });



})




app.put("/admin/update_category/:categoryId" ,(req,res)=>{
  const idCategory=req.params.categoryId;
  const newCategory=req.body.newCategory;
  console.log(newCategory);
  console.log("test pour edit categorie");
  console.log(idCategory)

  const updateQuery=`UPDATE Choix SET Choix='${newCategory}' Where IdChoix=${idCategory}`;
  connection.query(updateQuery, (err, results) => {
    if (err) {
      console.error("Error executing MySQL query:", err);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
      return;
    } else {
      res
        .status(200)
        .json({ success: true, message: "catégorie bien modifié !" });
    }
  });

})


app.put("/admin/update_function/:functionId" ,(req,res)=>{
  const idFunction=req.params.functionId;
  const newFunction=req.body.newFunction;
  console.log(newFunction);
  console.log("test pour edit categorie");
  console.log(idFunction)

  const updateQuery=`UPDATE Choix SET Choix='${newFunction}' Where IdChoix=${idFunction}`;
  connection.query(updateQuery, (err, results) => {
    if (err) {
      console.error("Error executing MySQL query:", err);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
      return;
    } else {
      res
        .status(200)
        .json({ success: true, message: "fonction bien modifiée !" });
    }
  });

})





app.delete("/admin/functionDelete/:btnValue" ,(req,res)=>{
  const btnValue=req.params.btnValue;
  console.log(btnValue);

  const deleteQuery = `DELETE FROM Choix WHERE idChoix =${btnValue}`;
  connection.query(deleteQuery, (err, result) => {
    if (err) {
      console.error('Erreur lors de la suppression des données :', err);
      return;
    }
    console.log('Données supprimées avec succès.');
  });



})



app.put("/admin/AccountEdit/:email",(req,res)=>{
  console.log("vous etes en train de modifier");
  const email=req.params.email;
  console.log(email);
  const selectedFunction=req.body.selectedFunction;
  console.log(selectedFunction);
  const { nom, prenom, telephone } = req.body;
 console.log(nom);
  const idRole=req.body.idRole;
  console.log(idRole);

  const updateQuery = `UPDATE utilisateurs SET nom=?, prenom=?, telephone=?, idFonction=? WHERE email=?`;
  const values = [nom, prenom, telephone, selectedFunction, email];
  connection.query(updateQuery, values,(err, result) => {
  if (err) {
    console.error('Erreur lors de la suppression des données :', err);
    return;
  }
  else{
      res
      .status(200)
      .json({ success: true, message: "données utilisateur bien mises à" });}
  
 
});
})

app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
