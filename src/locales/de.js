import React from 'react';

export default {
  common: {
    skip: 'ÜBERSPRINGEN',
    features: 'Planfunktionen:',
    price: 'Preis',
    category: 'Category',
    item: 'Item',
    weight: 'Gewicht',
    details: 'Details',
    btn: {
      login: 'ANMELDUNG',
      signup: 'Registrieren',
      send: 'SENDEN',
      save: 'SPEICHERN',
      continue: 'FORTSETZEN',
      back: 'ZURÜCK',
      emptyCart: 'LEERER WARENKORB',
      continueShopping: 'MIT DEM EINKAUFEN FORTFAHREN',
      addToCart: 'IN DEN WARENKORB LEGEN',
      edit: 'BEARBEITEN',
      reorder: 'REORDER',
      cancel: 'CANCEL',
    },
    placeholder: {
      email: 'Email',
      password: 'Passwort',
      confirmPassword: 'Kennwort bestätigen',
      code: 'Code',
    },
    errors: {
      required: 'Pflichtfeld',
    },
  },
  welcome: {
    title: 'Hallo Yalla Liefer',
    body: 'Alle Märkte in Ihre Nähe, für alles jederzeit und überall einkaufen.',
    explore: 'Entdecken Sie die App!',
    skip: 'ANMELDUNG ÜBERSPRINGEN',
  },
  login: {
    title: 'ANMELDUNG',
    forgetPassword: 'Passwort vergessen?',
    noAccount: 'Ich habe kein Konto!',
    signup: 'Registrieren',
  },
  forgetPassword: {
    title: 'Passwort vergessen?',
    body: 'Geben Sie Ihre E-Mail-Adresse ein und wir senden Ihnen einen Bestätigungscode an Ihre E-Mail-Adresse',
    placeholder: {
      email: 'E-mail',
    },
    btn: {
      send: 'SENDEN',
    },
  },
  resetPassword: {
    title: 'Passwort zurücksetzen',
    body: 'Bitte geben Sie Ihr neues Passwort ein',
  },
  register: {
    title: 'Anmelden',
    placeholder: {
      firstName: 'Vorname',
      lastName: 'Nachname',
      phoneNumber: 'Telefonnummer',
      email: 'Email',
      password: 'Passwort',
    },
    haveAccount: 'Sie haben bereits ein Konto!',
  },
  verificationCode: {
    title: 'Bestätigungscode',
    body: 'Geben Sie den Bestätigungscode ein, den Sie zum Zurücksetzen des Passworts erhalten haben',
  },
  markets: {
    deliveryCost: 'Versandkosten',
    deliveryTime: 'Lieferzeit',
    reviews: 'Bewertungen',
    headerHello: 'Hallo,',
    headerText: 'Was Suchen Sie?',
    headerSubTitle:
      'Entdecken Sie unsere Märkte und überprüfen Sie deren Produkte',
    addressTitle: 'Adresse',
    phoneNumber: 'Telefonnummer',
    minimumOrderCost: 'Mindestbestellkosten',
    checkMenu: 'Überprüfen Sie Ihr Menü!',
    placeholder: {
      findProduct: 'Finden Sie ein Produkt mit Namen ...',
    },
    extraInfo: 'Zusatzinformation',
    cost: 'Kosten',
    amount: 'Menge',
    addNewProduct: 'NEUES PRODUKT HINZUFÜGEN +',
    form: {
      name: 'Marktname',
      address: 'Marktadresse',
      phoneNumber: 'Markttelefonnummer',
      deliveryPeriod: 'Lieferzeitraum',
      from: 'Von',
      to: 'Zu',
      minimumOrderCost: 'Mindestbestellkosten',
      enableDeliveryService: 'Lieferservice aktivieren?',
      deliveryCost: 'Versandkosten',
      maxDeliveryRadius: 'Maximaler Lieferradius',
      coverImage: 'Titelbild',
      logoImage: 'Logo Bild',
    },
  },
  orders: {
    orderToDeliverTo: 'Diese Bestellung wird an geliefert',
    missingAddress: 'Please select delivery address first',
    success: {
      seeOrders: 'SIEHE BESTELLUNGEN',
      messageShop: 'NACHRICHT SHOP',
    },
    btn: {
      checkout: 'Auschecken',
      sendOrder: 'BESTELLUNG SENDEN',
      startShopping: 'BEGINN MIT DEM EINKAUF',
      addMoreItems: 'Weitere Produkte hinzufügen',
      completeOrder: 'BESTELLUNG ABSCHLIESSEN',
      acceptOrder: 'BESTELLUNG AKZEPTIEREN',
      declineOrder: 'Bestellung ablehnen',
      messageCustomer: 'NACHRICHT KUNDE',
      messageShopOwner: 'NACHRICHT Verkäufer',
      rate: 'Shopbewertung ',
      cancel: 'BESTELLUNG STORNIEREN',
      saveChanges: 'ÄNDERUNGEN SPEICHERN',
    },
    cashNote: 'Die Rechnung wird nach Erhalt der Rechnung in bar bezahlt',
    placeholder: {
      deliveryAddress: 'Wählen Sie die Lieferadresse aus',
      note: 'Fügen Sie Ihrer Bestellung Notizen hinzu',
    },
    listHeaderTitle: 'Ihre Bestellungen',
    listHeaderText:
      'Überprüfen Sie Ihren Bestellstatus und informieren Sie sich immer darüber.',
    orderNumber: 'Bestellung #{{orderId}}',
    status: {
      pending: 'Warten',
      inProgress: 'In Bearbeitung',
      done: 'Geliefert',
      canceled: 'Abgelehnt',
    },
    cancel: {
      success: 'Bestellung erfolgreich storniert!',
    },
    shopOrdersTitle: 'Markt Bestellungen',
    shopOrdersSubtitle:
      'Informieren Sie sich über den Bestellstatus Ihrer Kunden und informieren Sie sich stets über diese.',
  },
  offers: {
    emptyText:
      'Ops! Wir haben momentan keine Angebote, bitte überprüfen Sie es später!',
    headerTitle: 'Bietet an',
    headerText:
      'Finden Sie die besten Angebote in unserer App, sparen Sie Geld und Zeit.',
    placeholder: {
      nameAr: 'Geben Sie den arabischen Namen ein',
      nameDe: 'Geben Sie den deutsche Namen ein',
      nameEn: 'Geben Sie den englischen Namen ein',
      descriptionAr: 'Beschreibung auf Arabisch ',
      descriptionDe: 'Beschreibung auf Deutsch',
      descriptionEn: 'Beschreibung auf Englisch',
      image: 'Bild für dieses Angebot hinzufügen',
      externalLink: 'Externen Link hinzufügen',
      expiredAt: 'Ablaufdatum hinzufügen',
    },
    btn: {
      addNew: 'NEUES ANGEBOT HINZUFÜGEN',
    },
    planIsOver: 'Your {{plan}} plan is over!',
    paymentWarning:
      'Ihr Abonnement ist abgelaufen, alle neuen Angebote, die Sie hinzufügen, werden separat bezahlt. Sie können Ihren Plan aktualisieren, um weitere kostenlose Angebote zu erhalten',
  },
  profile: {
    welcomeText: 'Hallo! willkommen',
    menu: {
      personalInfo: 'Personeninfo',
      addresses: 'Addresses',
      addressesSubtitle: 'City, Street, details',
      shopInfo: 'Marktinfo',
      personalInfoSubtitle: 'Name - Telefon - Adresse',
      shopInfoSubtitle: 'Telefon - Adresse - Arbeitszeit - Lieferservice',
      subscriptionInfo: 'Abonnement-Info',
      subscriptionValid: 'Gültig bis',
      joinUs: 'Shop eröffnen',
      joinUsSubtitle:
        'Eröffnen Sie Ihren eigenen Shop in wenigen Minuten, wir freuen uns sehr auf die Zusammenarbeit mit Ihnen',
      about: 'Über die App',
      aboutSubtitle: 'Erfahren Sie jetzt mehr über uns!',
      logout: 'Ausloggen',
      logoutSubtitle: 'Auf Wiedersehen!',
    },
  },
  chats: {
    messages: 'Nachrichten',
    newMessagesCount: 'Neue Nachrichten {{newMessagesCount}}',
    noMessage:
      'Ops! Wir haben keine neuen Nachrichten, es ist eine gute Zeit zum Entspannen',
    headerText:
      'Chatten Sie mit den Geschäften, in denen Sie bestellen,z.B. Sie können Fragen über Ihre Bestellung stellen',
  },
  address: {
    placeholder: {
      title: 'Adresse',
      street: 'Straße',
      details: 'Details',
      address: 'Adress',
      search: 'Search for address if you needed',
    },
  },
  subscriptions: {
    subscriptionHistory: 'Abonnementverlauf',
    gold: 'Gold',
    silver: 'Silber',
    expireAt: 'Ablauf am',
    currentSubscription: 'Aktuelles Abonnement',
    subscribedAt: 'Abonniert am',
    sepa_mandate:
      'Indem Sie Ihre Zahlungsinformationen angeben und diese Zahlung bestätigen, ermächtigen Sie (A) Yalla Liefer and Stripe, unseren Zahlungsdienstleister, Anweisungen an Ihre Bank zur Belastung Ihres Kontos und (B) Ihre Bank zur Belastung Ihres Kontos gemäß dieser Anweisungen zu senden . Als Teil Ihrer Rechte haben Sie gemäß den Bedingungen Ihrer Vereinbarung mit Ihrer Bank Anspruch auf eine Rückerstattung von Ihrer Bank. Eine Rückerstattung muss innerhalb von 8 Wochen ab dem Datum der Belastung Ihres Kontos geltend gemacht werden. Ihre Rechte werden in einer Erklärung erläutert, die Sie bei Ihrer Bank erhalten können. Sie erklären sich damit einverstanden, Benachrichtigungen über zukünftige Abbuchungen bis zu 2 Tage vor deren Ausführung zu erhalten.',
  },
  menu: {
    addProductTitle: 'Menü Produkt',
  },
  reports: {
    revenues: 'Erlöse',
  },
  errors: {
    default: 'Etwas ist schief gelaufen. Bitte versuche es erneut',
    submit: 'Es ist ein Fehler aufgetreten. Bitte überprüfen Sie Ihre Daten',
    206: 'Telefonnummer ist bereits vorhanden',
    203: 'E-Mail ist bereits vorhanden',
    email_already_exist: 'E-Mail ist bereits vorhanden',
    phone_already_exist: 'Telefonnummer ist bereits vorhanden',
    invalid_credentials:
      'Benutzername oder Passwort sind falsch!\n' +
      'Bitte überprüfen Sie Ihre Anmeldeinformationen',
    invalidInput: 'Bitte füllen Sie alle erforderlichen Felder aus',
  },
};
