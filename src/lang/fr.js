export default {
  title: "Sorted Wallet",

  username: `Nom d'utilisateur`,
  email: "E-Mail",
  password: `Mot de passe`,
  phoneNumber: "Numéro de téléphone",
  otpCode: "OTP Code (Code à 6 chiffres)",
  select: `Select`,
  back: "Retour",
  view: "Voir",
  cancel: "Annuler",
  actions: "Actions",
  options: "Options",
  error: "Erreur",
  success: "Succès",
  ok: "OK",
  next: "Suivant",
  agree:'Accepter',
  closeAd: `Fermer l'annonce`,

  login: "Login",
  register: `S'inscrire`,
  logout: "Logout",
  forgotPassword: "Mot de passe oublié?",

  genericErrorTitle: `Quelque chose n'a pas fonctionné`,
  genericError: `Quelque chose n'a pas fonctionné. Veuillez réessayer`,

  loggedOut: "Vous avez été déconnecté, veuillez vous reconnecter",
  offline: {
    title: "Vous êtes hors ligne",
    text: `Il semble qu'il y ait un problème avec votre connexion. Veuillez vérifier votre connexion réseau`,
    refresh: "Actualiser",
  },

  wallets: {
    bitcoin: "BTC Balance",
    matic: "MATIC Balance",
    matic_usdc: "USDC",
    matic_usdt: "USDT",
    matic_alternate: " (Polygon)",
  },

  pages: {
    signup: {
    title: "titre",
    emailRequired: "Email requis",
    passwordRequired: "Mot de passe requis!",
    passwordLength:
      "La longueur du mot de passe ne doit pas être inférieure à 5",
      cCodeRequired: "Pays requis !",
      instructions1: "Sorted Wallet vous enverra un code unique pour vérifier votre adresse e-mail.",
      instructions2: "Veuillez saisir le code à 6 chiffres qui vous a été envoyé.",
    },
     

  login: {
    title: "Login",
    instructions1:
      "Sorted Wallet vous enverra un code unique pour vérifier votre numéro de téléphone..",
    instructions2:
      "Entrez le code à 6 chiffres qui a été envoyé au {téléphone}.",
  },
    setupPIN: {
      title: "Créez votre code pin",
      instructions1:
        "Veuillez le conserver pour les futures transactions du portefeuille",
      submit: "Soumettre",
      pinInput: "Code PIN",
      confirmPinInput: "Confirmez votre code PIN",
      errors: {
        required: "Veuillez saisir un code pin numérique.",
        match: `L'épingle saisie ne correspond pas`,
        length: `Le numéro d'identification doit être compris entre 3 et 7 chiffres`,
      },
    },
    firstpage: {
     choose: "Faites défiler pour choisir votre langue",
   },
    homepage: {
      intro: {
        title: "Bienvenue à Sorted Wallet",
        sub: `Se connecter ou s'inscrire pour continuer`,
      },
      emailLogin: `Email et mot de passe`,
      phoneLogin: "Numéro de téléphone",
    },

    forgotPassword: {
      title: "Mot de passe oublié",
      resetPassword: "Réinitialiser le mot de passe",
    },

    settings: {
      changeLanguage: "Changer la langue",
    },

    dashboard: {
      myWallets: "Mon (mes) portefeuille(s)",
      settings: "Paramètres",

      qrCode: "Code QR",
      transactionRecords: "Registres des transactions",
      makeTransaction: "Effectuer une transaction",
      share: "Partager",
      shareEmail: "Email",
      shareMessage: "Message",
    },

    makeTransaction: {
      title: "Effectuer une transaction",
      upload: `Télécharger l'image (code QR)`,
      scan: "Scanner QR (adresse du portefeuille)",
      destination: "Adresse de destination",
      amount: "Montant",
      pin: "Code Pin",
      submit: "Soumettre",
    },

    transactions: {
      makeTransaction: "Effectuer une transaction",
      title: "Enregistrements de transactions",
      noTransactions: "Pas encore de transactions",
    },
  },

  tac: {
    agree: "Accorder",
    scrollDown: "Défilement vers le bas",

    error: "Veuillez accepter les termes et conditions !",

    confirm: {
      primary: `J'ai lu et j'accepte`,
      secondary: `sur les conditions générales d'utilisation`,
    },
  },
};
