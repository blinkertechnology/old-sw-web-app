export default {
    title: 'Sorted Wallet',

    username: 'Username',
    email: 'Email',
    password: 'Password',
    phoneNumber: 'Phone number',
    otpCode: '6-digit code',

    select: 'Select',
    back: 'Back',
    view: 'View',
    cancel: 'Cancel',
    actions: 'Actions',
    options: 'Options',
    error: 'Error',
    success: 'Success',
    ok: 'OK',
    next: 'Next',
	agree: 'Agree',//Ani added

    login: 'Login',
    register: 'Register',
    logout: 'Logout',
    forgotPassword: 'Forgot Password?',

    genericErrorTitle: 'Something went wrong.',
    genericError: 'Something went wrong. Please try again shortly.',

    loggedOut: 'You have been logged out, please log in again.',
    offline: {
        title: 'You are offline.',
        text: 'It seems like there is a problem with your connection. Please check your network connection.',
        refresh: 'Refresh'
    },

    wallets: {
        bitcoin: 'BTC Balance',
        matic: 'MATIC Balance',
        matic_usdc: 'USDC on Polygon',
		matic_usdt: 'USDT on Polygon'
    },

    pages: {
        signup: {
            title: 'Register',
            emailRequired: 'Email Required!',
            passwordRequired: 'Password Required!',
            passwordLength: 'Password length should not be less than 5 characters.'
        },

        login: {
            title: 'Login',
            instructions1: 'Sorted Wallet will send you a one-time code to verify your phone number.',
            instructions2: 'Please Enter the 6-digit code that was send to {phone}',
        },

        setupPIN: {
            title: 'Create your pin code',
            instructions1: 'Please remember it and keep it safe for future wallet transactions.',
            submit: 'Submit',
            pinInput: 'Pin',
            confirmPinInput: 'Confirm pin',
            errors: {
                required: 'Please enter a numeric pin code.',
                match: 'Entered pin does not match',
                length: 'Pin must be between 3 and 7 digits'
            }
        },
		firstpage:{
			choose: 'Scroll to choose your language'
		},
        homepage: {
            intro: {
                title: 'Welcome to Sorted Wallet',
                sub: 'Login or Register to continue.',
            },
            emailLogin: 'Email & Password',
            phoneLogin: 'Phone Number'
        },

        forgotPassword: {
            title: 'Forgot Password?',
            resetPassword: 'Reset password'
        },

        settings: {
            changeLanguage: 'Change language'
        },

        dashboard: {
            myWallets: 'My Wallet',//changed from Wallet (s) to Wallet as per request
            settings: 'Settings',
            faq: 'FAQ',

            qrCode: 'QR Code',
            transactionRecords: 'Transaction Records',
            makeTransaction: 'Make Transaction',
            share: 'Share Wallet Address',
            shareEmail: 'Email',
            shareMessage: 'Message',
        },

        makeTransaction: {
            title: 'Make Transaction',
            upload: 'Upload Image (QR Code)',
            scan: 'Scan QR (Wallet Address)',
            destination: 'Destination Wallet Address',
            amount: 'Amount',
            pin: 'Pin Code',
            submit: 'Submit',
        },

        transactions: {
            makeTransaction: 'Make transaction',
            title: 'Transaction records',
            noTransactions: 'No Transactions yet.'
        },
    },

    faq: {
        title: 'Sorted Wallet Knowledge Base',
        introduction: `We have put together some helpful information and tutorials that will allow you to use Sorted Wallet to its full potential. 
            Please read through this knowledge base to find answers to your questions, and feel free to contact us if you still could not find what you were looking for!`,
        blocks: [
            {
                title: 'Getting Started',
                body: [
                    [
                        `What is Sorted Wallet?`,
                        `Sorted Wallet is the first digital asset wallet on KaiOS platform.
                        With Sorted Wallet, users can store, send and receive digital assets instantly without having to own a high-end smartphone. 
                        Sorted Wallet is created to bring a digital asset wallet in the hands of individuals from emerging markets where not everyone can afford a smartphone.
                        You can download Sorted Wallet through the KaiStore on KaiOS devices or through its desktop version at wallet.sorted.finance`
                    ],
                    [
                        `How to register for Sorted Wallet?`,
                        `Any user can register for Sorted Wallet using 2 ways, using their Email ID or their Phone Number. 
                        A user may register for Sorted Wallet either through their KaiOS device or through the desktop version.`
                    ],
                    [
                        `How to Register for Sorted Wallet on KaiOS devices:`,
                        `1. Download Sorted Wallet on your KaiOS device.
                        2. Open the Sorted Wallet app.
                        3. After agreeing to the Terms & Conditions, you will see 2 options of Login and Register. Click on Register.
                        4. You will be prompted with 2 options: Email & Password and Phone Number. 
                           Choose the option you like and then fill in the required information.
                        If you choose a Phone Number, you will be prompted to type in a one-time password.
                        5. After the previous step, you will be asked to type in a numeric PIN (3 to 7 digits) which you must remember for all future transactions of your wallet.
                        6. After all steps have been completed, Woohoo, you have successfully registered for Sorted Wallet!
                        `
                    ],
                    [
                        `How to Register for Sorted Wallet on desktop devices:`,
                        `1. Open wallet.sorted.finance
                        2. Click on “Don’t have an account? Sign up here”.
                        3. Fill in the required information. Choose a username, type your Email ID and set a password.
                        4. You will be prompted with 2 options: Email & Password and Phone Number.
                           Choose the option you like and then fill in the required information.
                           If you choose a Phone Number, you will be prompted to type in a one-time password.
                        5. After the previous step, you will be asked to type in a numeric PIN (4 to 6 digits) which you must remember for all future transactions of your wallet.
                        6. After all steps have been completed, Woohoo, you have successfully registered for Sorted Wallet!
                        `
                    ],
                    [
                        `Who can create an account on Sorted Wallet?`,
                        `Any user (over the age of 18) with a valid E-mail ID or Phone Number can become a Sorted Wallet user.`
                    ],
                    [
                        `How to send digital assets with Sorted Wallet?`,
                        `On your My Wallets page, click on either of your wallets and select Make Transaction. Once you are on the transaction page, either type in the wallet address or scan the QR code of the destination wallet address to automatically paste in the wallet address. 
                        Once the wallet address is typed, type in the Amount and your PIN (the one you set up when registering for an account on Sorted Wallet). 
                        Now confirm all the details to ensure you are sending the right wallet address the right amount of digital assets, once confirmed, click Submit and the transaction will start processing immediately.`
                    ],
                    [
                        `How to receive digital assets with Sorted Wallet?`,
                        `On your My Wallets page, click on either of your wallets and select QR Code for people around you to scan your wallet address, or share the wallet address with either email or message to people who live far away from you. 
                        Ask them to copy the wallet address and use it to send digital assets to your wallet.`
                    ],
                    [
                        `Why does Sorted Wallet have no seed phrase / recovery phrase?`,
                        `For the ease and comfort of our users, we partnered with Venly, an industry-leading Web3 company in tech solutions. They handle the security and private keys management of the Sorted Wallet.
                        You can rest easy knowing that your private keys do not reside on your device, and not on any server managed by Sorted. It is handled by a robust and elegant system developed by Venly. Strict access control policies and lists, AES encryption, and secret sharing algorithms ensure that your private keys reside safely in vaults only accessible by your account login and pincode. Just click here to read all about the security behind Venly’s API.`
                    ],
                    [
                        `How do I keep my wallets safe?`,
                        `Sorted Wallet requires that you store your PIN in a safe place. It is the only way to interact with your wallet assets and to make transactions out of the Sorted Wallet. We recommend you to write it down. If you lose your PIN, it will be difficult for us to help you recover your wallet. We also encourage you to never share your PIN with anyone or any site, unless you want them to have full control over your funds.`
                    ],
                    [
                        `Is the app available in different languages`,
                        `Yes, the app can be operated using 4 languages. These 4 languages are English, Vietnamese, Hausa and Urdu. Please write to us at support@sorted.finance if you would like us to include the local language of your region. `
                    ]
                ]
            },
            {
                title: 'Blockchain 101',
                body: [
                    [
                        `What is Bitcoin (BTC)?`,
                        `Bitcoin (BTC) is a cryptocurrency, a form of digital money that allows secure and seamless peer-to-peer transactions on the internet.
                        It is the world’s first widely-adopted cryptocurrency. 
                        With Bitcoin, people can securely and directly send each other digital money on the internet.`
                    ],
                    [
                        `What is MATIC?`,
                        `MATIC is a cryptocurrency developed by the company Polygon, which is a technology platform that enables blockchain networks to connect and scale.
                        MATIC is an ERC-20 token, meaning that it is compatible with other Ethereum-based digital currencies.
                        MATIC is used to govern and secure the Polygon network and to pay network transaction fees.`
                    ],
                    [
                        `What is USDC?`,
                        `USD Coin (USDC) is a type of cryptocurrency that is referred to as a stablecoin. This means 1 USDC will always be equal to US$1.00, giving it a stable price. This is a cryptocurrency backed by fully reserved assets to ensure the stability of the coin. `
                    ],
                ]
            },
            {
                title: 'Troubleshooting',
                body: [
                    [
                        `I forgot my password. What should I do?`,
                        `For users who registered using an E-Mail:

                        When on the Login / Register page of your Sorted Wallet, click on Forgot Password to be redirected to receive a link to create a new password for your Sorted Wallet account.
                        For users who registered using a Phone Number:
                        
                        You will receive a new OTP every time you login, so just remember to keep your phone number safe and available at all times to be able to login to your Sorted Wallet account.`
                    ],
                    [
                        `I forgot my PIN. What should I do?`,
                        `You must contact us immediately at support@sorted.finance and share your wallet address. 
                        We will then contact our technology partner Venly, who will reset the PIN from their end and provide you with one time link including the pin. We are working on automating this process so please be understanding while we manually process your request.`
                    ],
                    [
                        `I have an issue / complaint / feedback. Who do I contact?`,
                        `We are so sorry that you are facing issues with the Sorted Wallet. Please write about your problem to us on support@sorted.finance and someone from our team will get back to you as soon as possible. `
                    ]
                ]
            }
        ]
    },

    tac: {
        agree: 'Agree',
        scrollDown: 'Scroll Down',

        error: 'Please agree to the Terms & Conditions.',

        confirm: {
            primary: 'I have read and agreed',
            secondary: 'to the Terms & Conditions',
        },

        body: [
			`Terms of Use

		Important Notice


		This KaiOs Application and https://wallet.sorted.finance/ (the “Website”) is a website operated by Sors Technology Limited (“SORS”). These Terms of Use will apply when you use our Website, the Account, the Wallet, the Platform or Service.


		Sors Technology Limited is a private company limited by shares incorporated in Hong Kong with Companies Registry number 3132391.


		Before proceeding, you must read and agree to these Terms of Use. If you do not agree to these Terms of Use, then you must not use our Website, the Account, the Wallet, the Platform or any Service. If however, you agree to and accept these Terms of Use, you will be given the opportunity to click on the ‘I acknowledge that I have read, understood and agreed to be bound by these Terms of Use’ button which appears at the end of this document, and you will then be able to use the Website, the Platform, the Account, the Wallet and Services under and subject to these Terms of Use.


		Cryptocurrencies are volatile. Carefully evaluate your goals and the financial risk you are willing to take before using our Service. SORS does not provide financial, tax or legal advice. Decisions to perform any transactions involving cryptocurrencies should be taken on your own. We recommend you seek advice and opinions of reliable and qualified experts in respect of transactions you undertake.



		1.	Definitions

		1.1	In these Terms of Use, the following capitalised terms have the meaning given to them in this paragraph 1.1:

		“Account” means the account opened with SORS by you to access your Wallet and to use our Services;

		“Confidential Information” means all information related to the Website, the Platform the Services and the business of SORS that is marked or treated as confidential or secret by SORS, or should reasonably be regarded as confidential or secret from the applicable context and circumstances;

		“Copyrighted Contents” means the Wallet, Website, the Platform, and the information and content available therein that are protected worldwide by copyright laws;

		“Cryptocurrencies” means digital representations of value which may be in the form of digital tokens (such as utility tokens, stablecoins, security tokens, or asset-backed tokens) or any other virtual commodities, crypto assets or other assets of essentially the same nature;

		“Intellectual Property Rights” means all intellectual property rights including patents, trademarks, design rights, copyrights, database rights, trade secrets, know-how and all rights of an equivalent nature.

		“Login ID” means your screen name from registering with the Website or the Platform;

		“Password” means the password you selected upon registration with the Website or the Platform to access your Account and Services through the Platform or the Website, as updated from time to time;

		“Platform” means the device, mobile or tablet application, or other similar forms of digital platform, that grant access to an Account and a Wallet;

		“Privacy Policy” means the privacy policy from time to time of SORS, which may be viewed here.

		“Prohibited Acts” means the acts set out in paragraph 5;

		“Restricted Locations” means the countries or jurisdictions subject to prohibitions or restrictions on accessing or using the Website, Platform and Services, as notified on our Website or to you from time to time;

		“Services” means one or more services of SORS;

		“Terms of Use” means the terms of these Terms of Use;

		“Wallet” means a software programme which interacts with various supported blockchain networks to generate and manage sets of private keys and public keys, configure transactions and monitor their balance through the Platform;

		“Website” means https://wallet.sorted.finance/ operated and controlled by SORS, and any updated, upgraded or successor websites operated and controlled by SORS.

		1.2	Section headings in these Terms of Use are for convenience only and shall not govern the meaning or interpretation of any provision of these Terms of Use.
		1.3	In these Terms of Use, the words importing the singular shall include the plural and vice versa unless the context under these Terms of Use clearly indicates the contrary.
		2.	Acceptance

		2.1	You represent and warrant that:

		(a)	(if you are an individual) you are 18 years or older;

		(b)	(if you are a corporation) you are duly incorporated and organised, and validly existing, under the applicable laws of the jurisdiction of your organisation, and any person performing any act in relation to your Account, the Wallet or our Services under these Terms of Use is duly authorised by such legal entity to act on its behalf;

		(c)	you have the authority to enter into a legally binding contract with SORS;

		(d)	you are not barred under any applicable laws or contracts from entering into a legally binding contract with SORS or to use our Services;

		(e)	all information and details you provide to us are true, current, complete and not misleading;

		(f)	you are not a resident, or a tax resident of, and do not otherwise have any relevant connection with, any Restricted Locations;

		(g)	you are not located in, under the control of, or a national, citizen or resident of any Restrict Locations;

		(h)	you do not intend to transfer or provide Cryptocurrencies to, or receive Cryptocurrencies from, anyone in any Restricted Locations or any person that is on any of the sanctions lists published and maintained by the United Nations, European Union, any EU country, UK Treasury or US Office of Foreign Assets Control; and

		(i)	you are not on any of the sanctions lists published and maintained by the United Nations, European Union, any EU country, UK Treasury or US Office of Foreign Assets Control.

		2.2	SORS reserves the right to request written confirmation, or to seek additional documents or information, regarding your authority to agree to these Terms of Use.

		2.3	SORS reserves the right to refuse access to any users to our Website or the Services if SORS, in its absolute discretion, deems such refusal necessary.

		2.4	You represent and warrant that neither you nor anyone authorised by you:

		(a)	have been convicted for any computer or internet related crime;

		(b)	are located in a region that is prohibited from using the Services by law; and

		(c)	have been refused Services by SORS in the past.

		2.5	Your application to create an Account and a Wallet constitutes:

		(a)	your representation and warranty that you have read these Terms of Use carefully and in their entirety;

		(b)	your acceptance of these Terms of Use; and

		(c)	your undertaking to us to comply with them.

		2.6	If you do not agree to these Terms of Use, you must not use the Website or our Services.

		2.7	You must expressly agree to these Terms of Use to:

		(a)	register your details with our Website or through the Platform;

		(b)	create an Account and a Wallet;

		(c)	submit information to or via our Website or the Platform;

		(d)	access your Wallet through the Platform; or

		(e)	use our Services.

		2.8	By visiting our Website, creating an Account and a Wallet, accessing the Platform, using our Services or agreeing to these Terms of Use:

		(a)	you also agree and consent to our Privacy Policy. Our Privacy Policy can be reviewed here; and

		(b)	you consent and agree to comply with our Acceptable Use policy (see paragraph 5 below for further details).

		2.9	We recommend you print a copy of these Terms of Use for future reference.

		3.	Registration

		3.1	As a condition to using our Services, you will be required to:

		(a)	register with SORS and create an Account and a Wallet;

		(b)	select a password (“Password”); and

		(c)	select an email address as your log-in ID (“Login ID”).

		3.2	You will provide SORS with accurate, complete, and updated registration information and documents. Failure to do so constitutes a breach of these Terms of Use, which may result in immediate termination of your Account. You agree to indemnify SORS, our associated companies, and any third-party service providers from and against any and all losses and damages incurred as a result of your failure to provide accurate, complete and updated information to SORS. If we believe documents you have provided us are not current, accurate, authentic, true, or complete, or are misleading, or have been tampered with, or those documents otherwise fail our compliance and security standards for any reason, we may cease all steps to register your details, approve an Account, provide access to our Services, create a Wallet for you, or otherwise engage with you. We will not be required to provide you with any comment or feedback in these circumstances.

		3.3	We may request information and details about you as we consider necessary or appropriate. This may include your name, password, e-mail address, postal address, telephone number, ID number, birthdate, taxpayer identification number, personal bank or card account details. You will provide information and details to us promptly when requested by us, and as prompted by our registration and verification process or as prompted at any time following creation of an Account.  You will promptly update any information or details you provide to us so your information and details with us are complete and accurate at all times.

		3.4	We may verify your details, at any time, by requesting certain documents and information from you. These may include constitution documents and copies of business registrations or registers in respect of business entities, and government issued passports or identification documents of individuals.

		3.5	We may perform further background checks or conduct other inquiries on you conducted by any third party whom we select and appoint. We may take all actions we consider appropriate or necessary arising from those checks and inquiries, and we will not be required to provide you comment or feedback on them. You authorise us to conduct background checks and conduct inquiries in respect of you, and to disclose your personal data and other documents and information to third party service providers in respect of those background checks and inquiries.

		3.6	You must not:

		(a)	select or use an Account or a Wallet of another person with the intent to impersonate that person;

		(b)	use an Account or a Wallet subject to any rights of a person other than you without appropriate authorisation; or

		(c)	use as a Login ID words that are otherwise offensive, vulgar or obscene.

		3.7	SORS reserves the right to refuse registration of, suspend access to, or cancel an Account or a Wallet in its sole discretion.

		3.8	(a)	You are solely responsible for activity that occurs in your Account or Wallet.

		(b)	You must never use another person’s Account or Wallet.

		(c)	You may not create or use an Account or a Wallet in any manner that is not authorised or approved by us.

		(d)	You may not assist others to create or use an Account or a Wallet in an unauthorised manner.

		(e)	You must not distribute instructions, software or tools for the purpose of creating or using an Account or Wallet in an unauthorised manner.

		(f)	Any Account created or used in an unauthorized manner will result in the immediate suspension or termination of the Account.

		4.	Security

		4.1	We may provide you with security alerts from time to time. We will not in any manner be held responsible for any damages or losses arising from or in connection with your failure to properly and fully follow or act upon any security alerts we send you.

		4.2	(a)	If you choose, or you are provided with, a Login ID or Password or any other piece of information as part of our security procedures, you must treat that information as confidential. You must not disclose it to any third party.

		(b)	We have no obligation to maintain your Login ID and Password. We will assist you in retrieving your Login ID and Password if you misplace, forget or lose that information but we cannot guarantee the retrieval will be successful.

		4.3	We have the right to disable, temporarily suspend or refuse any access to any Account or Wallet at any time (including to block your internet protocol address for internet access to the Platform), if we believe you have failed to comply with any of the provisions of these Terms of Use.

		4.4	You must promptly notify us at support@sorted.finance if you know or suspect that anyone other than you knows your Login ID and Password, or if you become aware of any unauthorised use of your Account or Wallet or any other security breach.

		4.5	You are responsible for any activity on our Website, the Platform or in respect of Services arising out of any failure to keep your Account, Login ID or Password confidential, and may be held liable for any losses arising out of such failure. Any compromise of your Login ID and Password may expose your Account and Wallet to unauthorised access by third parties, which may result in loss or theft of Cryptocurrencies in your Wallet. SORS has no obligation to maintain your Account, Login ID or Password. SORS will not be responsible or liable if you misplace, forget or lose your Account name or password.

		4.6	You are also responsible for ensuring that all persons who access our Website, the Platform, your Account (through your Login ID and Password) or our Services are aware of these Terms of Use and other applicable terms and conditions, and that they comply with them.  If you (or any person accessing our Website, the Platform, the Wallet or Services through your Account) are in breach, or suspected to be in breach, of these Terms of Use, we may disable, delete, suspend or cancel your Account or Wallet, or block your access to the Account through an internet protocol block.

		4.7	You must not sell, trade, assign or otherwise transfer your Account or Wallet to any other person.

		4.8	You must not use methods to conceal the location, or the internet protocol address, from which you access the Website, and you must disclose to SORS your accurate and true location when accessing the Website and using our Services.

		5.	Acceptable use

		5.1	You must not (“Prohibited Acts”):

		(a)	use our Website, our Services, your Account, your Wallet, or the Platform in any way or take any action that causes, or may cause, damage to the Website, our Services, your Account, your Wallet, or the Platform or impairment of the performance, availability or accessibility of the Website, our Services, your Wallet, or the Platform;

		(b)	use our Website, our Services, your Account, your Wallet, or the Platform in any way that is unlawful, illegal, fraudulent or harmful, or in connection with any unlawful, illegal, fraudulent or harmful purpose or activity;

		(c)	use the Website, our Services, your Account, your Wallet, or the Platform to copy, store, host, transmit, send, use, publish or distribute any material which consists of (or is linked to) any spyware, computer virus, Trojan horse, worm, keystroke logger, rootkit or other malicious computer software;

		(d)	conduct any systematic or automated data collection activities (including scraping, data mining, data extraction, or data harvesting) on or in relation to the Website, our Services, your Account, your Wallet, or the Platform without our express written consent;

		(e)	access or otherwise interact with the Website, our Services, your Account, your Wallet, or the Platform using any robot, spider or other automated means;

		(f)	copy, redistribute, publish, reverse engineer, decompile, disassemble, modify, translate or in any manner make any attempt to access the source code (whether to create derivative works of the source code, or otherwise);

		(g)	sell, assign, sublicence, transfer, distribute or lease your access to the Website;

		(h)	violate the directives set out in the robots.txt file for the Website, our Services, your Account, your Wallet, or the Platform;

		(i)	use data collected from the Website, our Services, your Account, your Wallet, or the Platform for any direct marketing activity (including email marketing, SMS marketing, telemarketing or direct mailing);

		(j)	use data collected from the Website, our Services, your Account, your Wallet, or the Platform to contact individuals, companies or other persons or entities;

		(k)	make the Website available to any third party through a private computer network;

		(l)	edit or otherwise modify any content or paper or digital copies of any materials printed off or copied from our Website in any way;

		(m)	use the Website, our Services, your Account, your Wallet, or the Platform in a manner prohibited by any laws or regulations which apply to the use of the Website, our Services, your Account, your Wallet, or the Platform;

		(n)	transmit any material that is unlawful, disruptive, threatening, profane, abusive, harassing, embarrassing, tortuous, defamatory, obscene, libelous, is hateful or racially or ethnically offensive;

		(o)	directly or indirectly, decompile, disassemble, reverse engineer or otherwise attempt to derive the structure of the Services, the Platform or your Account, your Wallet, or the source code from the Services, the Platform or your Account, your Wallet; and

		(p)	use or access the Website, our Services, your Account, your Wallet, or the Platform in order to build a similar or competitive product or service or disclose to any third party any benchmarking or comparative study involving the Services.

		5.2	You must ensure that all the information you supply to us:

		(a)	is true, accurate, current and complete, and is not misleading;

		(b)	complies with all applicable laws and regulations;

		(c)	does not infringe the privacy, personal data protection, confidentiality or intellectual property rights or other rights of any person; and

		(d)	is not offensive, abusive, pornographic, defamatory, unreliable, misleading, illegal or otherwise objectionable.

		5.3	Please e-mail us at wallet@sorted.finance with details if you learn of any material or activity on our Website or in respect of our Services that breaches these Terms of Use or of any Prohibited Acts. You will provide SORS with any reasonable assistance in relation to any investigation that SORS may conduct as a result of the information provided by you in this respect.

		6.	Wallet and the Platform

		6.1	The Wallet, Website, the Platform, and the information and content available therein are protected worldwide by copyright laws (“Copyrighted Content”). Subject to the terms of these Terms of Use, SORS grants you a limited licence to reproduce portions of Copyrighted Content to access the Account, the Wallet and the Platform, and use our Services for your personal or internal business purposes.

		6.2	Upon being successfully registered with SORS, you will be granted access to your Wallet through the Platform, which enables you to:

		(a)	access the means to perform operations on various blockchain networks in accordance with their respective protocol rules, including to store, receive, track and transfer certain supported Cryptocurrencies in your Wallet to another wallet;

		(b)	view the balance of Cryptocurrencies in your Wallet; and

		(c)	connect with third party services (subject to whether the third party services are supported by SORS.

		Subject to these Terms of Use, SORS grants you a non-assignable, non-transferable, non-sublicensable, revocable, and non-exclusive licence and right to use the Platform for your personal or internal business purposes.

		6.3	The Platform is locally installed, or the Website will be accessible from your own local device. You are responsible for the security of your device on which the Platform is installed, or the Website is accessed, including ensuring that you keep anti-virus software current and otherwise protect the device against malware. SORS is not responsible for any loss or damages (including loss of Cryptocurrencies) resulting from your failure to keep the device safe and free of any malware.

		6.4	You may be required to accept or install updates to the Platform, or update third-party software (such as browsers or operating systems), in order to access the Wallet or our Services, or access their latest features, including security updates. SORS may update the Platform and Services at any time, without providing notice.

		6.5	By accessing the Account and using your Wallet through the Platform, you agree not to:

		(a)	licence, sell, rent, lease, transfer, assign, reproduce, distribute, host or otherwise commercially exploit our Services or the Copyrighted Content, or any portion thereof;

		(b)	frame or enclose any trademark, logo or other Copyrighted Content (including images, text, page layout or form);

		(c)	copy, reproduce, distribute, republish, download, display, post or transmit any Copyrighted Content except as expressly permitted herein; and

		(d)	remove or destroy any copyright notices or other proprietary markings contained on or in the Services or the Copyrighted Content.

		6.6	SORS does not guarantee the correct functioning of the Platform in the event of the installation or use of programs or applications that do not conform to Platform specifications and technical standards.

		6.7	SORS does not guarantee that the Website and Platform will always be available or be uninterrupted. SORS may stop, suspend or withdraw or restrict the availability of all or any part of our Website or the Platform for business or operational reasons, including:

		(a)	compliance with the terms of any third party contract;

		(b)	continued provision of the Website or the Platform are illegal or contrary to any law, regulation, guideline or request of any regulatory authority; or

		(c)	a claim or potential claim that continued provision of the Website or the Platform infringes or violates the rights of any third party.

		SORS will use reasonable endeavors to give you reasonable notice of any suspension or withdrawal to the extent that circumstances or applicable laws permit.  You will not be entitled to any compensation or other payment upon the discontinuance, suspension, withdrawal or alteration of the Website or the Platform.

		6.8	SORS may make obsolete a prior version of the Website and Platform at any time.

		6.9	SORS will not have any obligation to provide any support to any prior version of the Website and Platform after they are made obsolete.

		7.	Cryptocurrencies and blockchain

		7.1	The Cryptocurrencies that you store in the Wallet may be subject to other terms and conditions that may be imposed by third parties. These third party terms may govern your use, storage and transfer of your Cryptocurrencies. It is your responsibility to understand applicable third party terms and conditions, and whether your use, storage and transfer of your Cryptocurrencies complies with such other terms and conditions or third party terms.

		7.2	Only certain Cryptocurrencies are supported by our Services. SORS may update the supported Cryptocurrencies from time to time, and will announce such update on the Website and the Platform. SORS will not be responsible to ensure you are informed of the update. You are responsible to keep yourself informed. SORS will not be liable for any losses if you transfer unsupported Cryptocurrencies into the Wallet.

		7.3	You represent and warrant that:

		(a)	 you have the necessary right to use, store, receive, share, display and transfer your Cryptocurrencies, and such use, storage, sharing, displaying, receiving and transferring of your Cryptocurrencies will not infringe the rights of any third party or breach any applicable law;

		(b)	you have sufficient knowledge and experience in blockchain technology, and sufficient prior experience in buying, selling, storying and holding Cryptocurrencies; and

		(c)	you have consulted or have been given the time and opportunity to consult your own legal, financial and tax advisors in respect of your use of your Account, Wallet, our Services and in respect of any transactions involving Cryptocurrencies.

		7.4	When transferring your Cryptocurrencies from your Wallet, you are responsible for checking and confirming that the recipient wallet address or public key information:

		(a)	supports the storage of your Cryptocurrencies;

		(b)	is valid and is compatible with the applicable token standard; and

		(c)	is correct.

		SORS is not liable for any losses of your Cryptocurrencies and will not assist you in retrieving such lost Cryptocurrencies if you fail to do so.

		8.	Services

		8.1	SORS’s Services allow you to:

		(a)	manage, change and retrieve your Login ID and Password;

		(b)	view and access your transaction history;

		8.2	Notwithstanding the above, you are responsible to:

		(a)	create and remember a strong Password that you do not use for any other service;

		(b)	[protect and keep your recovery information secure and confidential]; and

		(c)	protect access to your Wallet.

		8.3	We may change, update or suspend the Services, temporarily or indefinitely, so as to carry out work (including firmware and software updates), maintenance operations, amendments to the servers and bug fixes.  SORS will use reasonable efforts to give you prior notice of any significant disruption of the Services but will not be liable for any such disruption.

		8.4	SORS does not guarantee the correct functioning of the Services in the event of the installation or use of programs or applications that do not conform to Service specifications and technical standards.

		8.5	SORS may make obsolete any Service as a whole at any time.

		9.	Risk

		9.1	You should educate yourself in respect of all the legal norms and technical constraints relating to the proof-of-stake and proof-of-work blockchains, or other cryptographic proof concepts.

		9.2	You acknowledge that you have been informed of the following associated risks:

		(a)	Regulatory changes. Blockchain technologies are subject to continuous regulatory changes and scrutiny globally. This includes anti-money laundering and financial regulations. Our Services, or any portion of our Services, could be impacted by one or more changing regulatory requirements.

		(b)	Tax. Transactions in Cryptocurrencies or other general Cryptocurrencies events (including exchanges, air-drops, forkings and gains arising from staking) may be considered tax events according to legislation under which you are subject to taxation. You should consult your own tax or accounting advisor in relation to these transactions or events.

		(c)	Technology. Some of the technology supported or made available by SORS is new, untested and outside SORS’s control. Advances in cryptography, or other technical advances such as the development of quantum computers, could present risks to blockchain networks which could result in the theft or loss of Cryptocurrencies. Other adverse changes in the market forces or in the technology may prevent or compromise SORS’s performance under these Terms of Use.

		(d)	Cybersecurity. Hackers or other groups or organisations may attempt to interfere with SORS’s products and information systems in several ways. This may include denial of service attacks, side-channel attacks, spoofing, smurfing, malware attacks, or consensus-based attacks.

		(e)	Volatility. Prices of Cryptocurrencies are volatile and can fluctuate significantly in short periods of time, including a single day. There may be large or sudden shifts in value or Cryptocurrencies that may make any Cryptocurrencies to become worthless. There may be significant risk in acquiring or holding Cryptocurrencies.

		9.3	Notwithstanding the generality of the limitation under these Terms of Use, SORS is not liable for any loss that incurs as a consequence of the risks highlighted in this section.

		10.	Website linkage

		10.1	Links from our Website, or the Platform, to other websites and resources provided by third parties are provided for your information only. Links to other websites and resources from our Website or the Platform should not be interpreted as, and are not, recommendations or approval by us of those linked websites or resources, or any information you obtain from them.

		10.2	You acknowledge and accept that we have no right or control over the contents of other websites and resources that are linked from or referred to in our Website or the Platform.

		10.3	You may link to the Website or Platform, provided you do so in a way that is fair and legal and does not damage our reputation or take advantage of it.

		10.4	You must not establish a link in such a way as to suggest any form of association, approval or endorsement on our part where none exists.

		10.5	You must not establish a link to our Website or Platform on any website that is not owned by you.

		10.6	Our Website must not be framed on any other website, nor may you create a link to any part of our Website other than the home page.

		10.7	We reserve the right to withdraw linking permission without notice.

		10.8	The website in which you are linking must comply in all respects with the content standards set out in our Acceptable Use policy (see paragraph 5 above).

		10.9	Please contact wallet@sorted.finance to seek our prior permission to any linkage to our Website that does not comply with this paragraph 10.

		11.	Intellectual Property Rights

		11.1	SORS owns, or is the authorised licensee of, all rights, title and interest in the Website, the Platform, and technology deployed in the Wallet, including any software (in source and object forms), algorithms, user interface designs, architecture, Intellectual Property Right, and documentation (both printed and electronic). You shall not use any Intellectual Property Rights in respect of the Website, the Platform, the Wallet or our Services, except in accordance with these Terms of Use or having first obtained the prior written consent of SORS or such other third parties. All Intellectual Property Rights are reserved.

		11.2	Unless otherwise expressly provided, we do not own the Intellectual Property Rights provided by third parties. We make no representation, warranty or guarantee in respect of such Intellectual Property Rights, including whether any distribution or use of content or materials infringes the Intellectual Property Rights of another person. SORS has not examined or verified any third party Intellectual Property Rights.

		11.3	You must notify SORS promptly if you suspect or become aware of any misuse of the Website and the Platform (or any other Service) or any violation, infringement or misappropriation of Intellectual Property Rights by any other users or other third party.

		11.4	You must not edit or otherwise modify any material on our Website.
		11.5	If you print off or copy any part of our Website in breach of these Terms of Use, your right to use our Website will cease immediately.  You must, immediately upon our request, return or destroy any copies of the materials you have made.

		11.6	We reserve the right to restrict access to areas of our Website, or our whole Website, at our discretion. You must not circumvent or bypass, or attempt to circumvent or bypass, any access restriction measures on our Website.

		12.	Privacy

		12.1	Our Privacy Policy can be reviewed here and forms part of these Terms of Use on which you may access and use our Website, the Platform and our Service.

		12.2	You agree that SORS may collect and use personal data which you provide when registering on the Website or through the Platform. The use of personal data collected by us will be limited to granting you access to the Platform, the Website and our Services. You agree we can share your personal data with any external service provider, agents, advisors and consultants for the purpose of creating your Account, Wallet and granting you access to the Platform, the Website and our Services.

		12.3	We use cookies on our Website. We also use cookies to track the way you prefer to view our Website. By accepting these Terms of Use you also give consent to our use of cookies for this purpose. More information about cookies is contained in our Privacy Policy.

		12.4	If you provide us with your personal data, we will process that personal data in accordance with your instructions from time to time and will take appropriate security measures to protect that personal data against unauthorised and unlawful processing and against accidental loss, destruction or damage.

		13.	Viruses

		13.1	We do not guarantee that our Website, Platform or Services will be secure or free from bugs or viruses.

		13.2	You are responsible for configuring your information technology, computer programmes and platform to access our Website, the Platform or Services. You should use your own virus protection software.

		13.3	You must not misuse our Website, the Platform or Services by knowingly introducing viruses, trojans, worms, logic bombs or other material that is malicious or technologically harmful.

		13.4	You must not attempt to gain unauthorised access to our Website, the Platform or Services, the server on which our Website, the Platform or Services is stored or any server, computer or database connected to our Website or the Platform.

		13.5	You must not attack our Website, the Platform, our Services or Accounts or Wallets owned by other customers via a denial-of-service attack or a distributed denial-of service attack.

		13.6	If we believe you have breached the provisions of this paragraph, your right to access the Website, the Platform, your Account and your Wallet will cease immediately, and we may disable, delete, suspect or cancel your access to the Platform, your Account and the Wallet at any time. We may report any breach to relevant law enforcement authorities, and will do so if required to do so under applicable laws.

		14.	Disclaimer

		14.1	You acknowledge, that to the maximum extent permitted by applicable law, that the Website, the Platform, our Services and any relevant materials provided to you are provided on an “as is” basis. SORS disclaims any and all warranties relating to the Website, the Platform and the Services, and their respective content, express or implied, including but not limited to the implied warranties of non-infringement of third party rights, merchantability and fitness for a particular purpose, if any.

		14.2	SORS does not:

		(a)	provide a peer-to-peer marketplace for transactions of Cryptocurrencies;

		(b)	provide fiat currencies trading capabilities; or

		(c)	provide conversion, exchange or other facilities between fiat currencies.

		14.3	SORS does not represent or warrant that:

		(a)	the function contained in the Website, the Platform or Services will meet your requirements;

		(b)	the operation of the Website, the Platform or the Services will be interrupted, error-free, or absolutely secure from unauthorized access;

		(c)	defects in the Website, the Platform or the Services will be corrected; or

		(d)	the Website, the Platform or the Services are complete, correct in all respects, accurate in all respects, or fully reliable.

		14.4	No oral or written information or advice given by SORS creates a warranty or in any way increase the scope of its liability.


		14.5	SORS does not, and does not intend to, market to, sell to, induce, solicit, or advise any person in respect of any purchase, subscription or investment (or any related offer) in securities, Cryptocurrencies, tokens, non-fungible tokens (NFTs) or any physical or virtual assets (whether described as investment opportunities, or otherwise). None of the information made available by SORS constitutes an invitation, offer, opinion or recommendation to purchase, subscribe, invest in or participate in any securities, structured products, Cryptocurrencies, non-fungible tokens (NFTs) or any physical or virtual assets (whether described as investment opportunities, or otherwise).


		14.6	Your use of the Website, the Platform or Services, or any information, material or content obtained through our Website, the Platform or Services, is at your own risk and discretion.

		15.	Liability

		15.1	Subject to paragraph 15.13, SORS disclaims all liability to the maximum extent permitted by law, and SORS assumes no responsibility, for losses to you or any other person arising from:

		(a)	third party content or user content;

		(b)	SORS’s content, and in particular from the accuracy, completeness or current status of SORS’s content;

		(c)	reliance on information contained or functionality provided on, or through, these Terms of Use or our Website, the Platform or Services;

		(d)	inability to gain access to the Website, the Platform, your Account, your Wallet or the Services (or any part of it) or access is interrupted or partial, or functions with errors, at any time;

		(e)	any unauthorised access to or alteration of your transmission or data;

		(f)	any use of your Login ID, Password, Account, Wallet by any third parties, whether authorised or unauthorised by you;

		(f)	any deletion of, corruption of, or failure to store or send or receive your transmissions or data;

		(g)	any failure by us to perform, or delay in performing, any obligations, whether or not we give prior notice, if and to the extent that the failure or delay is caused by any circumstance beyond our reasonable control (which includes telecommunications failure, power supply failure, terrorism, fuel strikes, severe weather, computer breakdown, failure of suppliers to meet delivery requirements, industrial disputes and the absence of personnel due to illness or injury), and the time for performance of any obligation, the performance of which is so affected, will be extended accordingly;

		(h)	any unusual or unforeseeable event that is outside SORS’s reasonable control, including force majeure events, events of war or civil unrest, natural disasters, strike, lock-out, traffic disruption, acts of domestic or foreign governmental authorities, and the pandemic;

		(i)	anything caused by us as a result of complying with applicable laws and court orders;

		(j)	any acts, omissions, faults, failures to provide services or interruptions to services from any third party service providers instructed by SORS; and

		(k)	your failure to accept or install updates to the Platform, or update third-party software (such as browsers or operating systems), that are required to access the Wallet or our Services, or access their latest features, including security updates.

		15.2	SORS will not be liable to you (whether in contract, tort (including negligence), breach of statutory duty or otherwise) arising out of or in connection with these Terms of Use for any loss of profits, loss of business opportunity, loss of goodwill, loss of anticipated savings or benefits, or for any type of indirect, special or consequential loss, even if that loss or damage was reasonably foreseeable or the relevant party was aware of the possibility of that loss or damage arising. SORS will not be liable for fault on the part of any third party service providers instructed by SORS.

		15.3	SORS’s liability arising directly or indirectly under these Terms of Use, or that is not otherwise expressly excluded under these Terms of Use, will be limited to and capped at the higher of US$500] or the amount of fees for Services paid by you to SORS in the twelve months immediately before the act or omission alleged to have caused the liability. The amount of this limitation of liability will be reduced by the amount of any unpaid fees.

		15.4	Any claim by either party for breach of contract, tort (including negligence), breach of statutory duty or otherwise arising out of or in connection with these Terms of Use must be brought within one year of the act or omission alleged to have caused the loss or cost.

		15.5	Except to the extent that claims cannot be excluded or restricted by law, no claims arising out of or in connection with these Terms of Use may be brought by you personally against any of SORS’s employees, officers, advisors, consultants, external service providers or other representatives involved in the performance of the relevant obligations.

		15.6	Any disclaimer of liability includes all representations or warranties. All representations or warranties, whether contractual or non-contractual, and all warranties, conditions, terms, undertakings and obligations implied by statute, common law, custom, trade usage, course of dealing or otherwise (including implied undertakings of satisfactory quality, conformity with description and reasonable fitness for purpose) are excluded to the maximum extent permitted by law.

		15.7	Only one claim may be brought against us (including our employees, officers or consultants) arising from one act or omission. One act or omission includes one series of related acts or omissions, the same act or omission in a series of related matters or similar acts or omissions in a series of related matters, and includes all claims arising from any one matter.

		15.8	The limitations in this paragraph 15 apply to SORS aggregate liability to you, any group company to which you belong, and all individuals nominated by a corporate user together (including any other third parties to whom we are held liable, with or without our consent) in relation to any one claim, and you and any such other persons may together recover from SORS only once in relation to the same loss.

		15.9	Where a limitation of liability applies in whatever amount, the limitation applies to the entire performance of services by SORS, and there will not be separate aggregate limits of liability applicable to you, any group company to which you belong, and all individuals nominated by a corporate user.

		15.10	If SORS has joint and several liability to you with another party SORS will only be liable to pay you the proportion which is found to be fairly and reasonably due to SORS’s fault.  SORS will not be liable to pay you the proportion which is due to the fault of another party for which such other party would otherwise be liable.

		15.11	Any liability due from SORS to you will be reduced by the proportion for which another party would have been found to be liable if either:

		(a)	you had also brought proceedings or made a claim against that other party; or

		(b)	SORS had brought proceedings or made a claim against that other party under the Civil Liability (Contribution) Ordinance (Cap. 377) or similar law under any other relevant jurisdiction.

		15.12	In considering whether other parties may be liable to you, no account is to be taken of any inability on your part to enforce remedies against another party by reason of causes of action against that party becoming time-barred, or the party’s lack of means or the party’s reliance on exclusions or limitations of liability or that the other party has ceased to exist.

		15.13	No oral or written information given by SORS creates a warranty or in any way increase the scope of SORS’s liability.

		15.14	The exclusions and limitations of liability in these Terms of Use do not affect SORS’s liability:

		(a)	for death or personal injury arising from SORS’s negligence;

		(b)	for fraud or reckless disregard of professional obligations;

		(c)	for any other liabilities which cannot be excluded or limited in the jurisdiction to which any relevant claim is subject, including restrictions on SORS’s right to limit SORS’s liability in Hong Kong; and

		(d)	in any other case, to limit SORS’s liability to less than such minimum amount as may be required in the circumstances under any other law or regulation relevant to the claim, in which case such minimum amount will be deemed substituted for the amount that would otherwise apply.

		15.15	These provisions are exhaustive of the remedies of monetary damages for each party or any third party against either party arising out of or in connection with these Terms of Use.

		15.16	It is your sole responsibility to determine whether, and to what extent, any taxes apply to your use of the Wallet, and the ownership of and transaction relating to Cryptocurrencies. You should determine whether to withhold, collect, report and remit the correct amounts of taxes to the appropriate tax authorities. SORS is not obligated to, nor will SORS determine whether taxes apply, or calculate, collect, report, or remit any taxes to any tax authorising arising from any transaction for you.

		16.	Indemnity

		16.1	You will on demand fully indemnify, and keep fully indemnified, the Indemnified Parties from and against all claims (including any third party claims), costs and losses of any nature whatsoever that the Indemnified Parties may suffer or incur arising out of or in connection with:

		(a)	any material breach of the provisions of these Terms of Use by you or your representatives;

		(b)	any Prohibited Acts carried by you or your representatives;

		(c)	any infringement or alleged infringement by you or your representatives of any third party’s intellectual property rights;

		(d)	any breach by you of applicable laws;

		(e)	any fraud, negligence, misconduct or reckless carelessness in or about your obligations under these Terms of Use;

		(f)	your or your representatives’ use of our Website, the Platform or Service; and

		(g)	any acts or omissions performed by you or your representatives

		16.2	SORS will be entitled to recover from you all expenses SORS reasonably incurs in connection with an indemnified claim, and all such expenses will be payable on demand.

		16.3	The indemnities in this paragraph 16 will survive termination or expiry of these Terms of Use.

		17.	Variation

		17.1	SORS may amend these Terms of Use from time to time. SORS will give you prior notice of major changes that SORS believes may adversely affect you. SORS will inform you of any changes to these Terms of Use. The Terms of Use in force from time to time will apply to your use of our Website, the Platform and Services.

		17.2	If you do not agree to any revised Terms of Use, you must stop using our Website, the Platform and Services.

		17.3	If you have given your express agreement and consent to these Terms of Use, SORS will ask for your express agreement and consent to any revisions of these Terms of Use before your first use of the Website or Services after the revision comes into effect. If you do not give your express agreement and consent to the revised Terms of Use within such period as we specify, SORS will disable, delete, suspend or cancel your Account or Wallet, including blocking your internet protocol address for internet access to the Platform, and you must stop using the Website, the Platform and the Services.

		18.	Your breach

		18.1	Without prejudice to SORS’s other rights under these Terms of Use, if you breach these Terms of Use in any way, carried out any Prohibited Acts, or if SORS reasonably suspects that you have breached these Terms of Use in any way or carried out any Prohibited Acts, SORS may:

		(a)	send you one or more formal warnings;

		(b)	temporarily suspend your access to our Website, the Platform or Services;

		(c)	freeze any Cryptocurrencies in your Wallet;

		(d)	permanently prohibit you from accessing or using our Website, the Platform or Services;

		(e)	block computers using your IP address from accessing our Website, the Platform or Services;

		(f)	contact any or all your internet service providers and request that they block your access to our Website, the Platform or Services;

		(g)	suspend or delete your Account or Wallet; or

		(h)	commence legal proceedings or other claims against you, whether for breach of contract or otherwise.

		18.2	If SORS suspends or prohibits or blocks your access to our Website, the Platform or Services, or a part of our Website, the Platform or Services, you must not take any action to circumvent that suspension or prohibition or blocking (including creating or using a different account). SORS is not required to inform you of any action SORS chooses to take, explains reasons for taking any action, or explains SORS’s suspicion.

		18.3	Additionally, SORS may perform all or any of the acts set out in paragraph 18.1 if:

		(a)	SORS believes or suspects any activities in association with your Account or Wallet involves illegal activity or that does not comply with applicable laws;

		(b)	SORS is requested to do so by a court order, law enforcement or other government or regulatory order;

		(c)	if your Account is subject to litigation or investigation;

		(d)	you abuse the Services provided by SORS;

		(e)	you act in bad faith towards SORS;

		(f)	any third party service provider (including payment process service providers) refuses to provide services to you;

		(g)	any force majeure events occur arising from any matter or state of affairs beyond the reasonable control of SORS;

		(h)	SORS believes you adversely affect or may adversely affect SORS’s reputation;

		(i)	SORS believes your Account is associated with any account that has been suspended or terminated for breach of these Terms of Use or suspended for any other reason;

		(j)	you do not provide documents or information upon the request of SORS;

		(k)	any documents or information you provide SORS is false, misleading or not current or complete, or otherwise meet SORS’s requirements;

		(l)	your Account or any activities connected to your Wallet do not meet SORS's risk tolerance;

		(m)	you no longer comply fully with all requirements of SORS’s compliance and security procedures and processes; or

		(n)	you suffer an insolvency or bankruptcy event.

		19.	Termination and suspension

		19.1	You can stop using the Website, the Platform or Services at any time and you may delete your Account or Wallet by sending an email to wallet@sorted.finance. Upon deletion of your Account or Wallet, all specific Account information will be deleted. However, domain names and a log-register attributable to each deleted Account will be kept for archival and administrative purposes. SORS may also use unidentifiable, aggregated information originating from deleted Accounts in its general business operations.

		19.2	SORS may suspend the provision of the Website, the Platform or Services or terminate your Account or Wallet at any time, with or without cause, and with or without notice.

		19.3	Without prejudice to paragraph 19.2, SORS may suspend or terminate your Account or Wallet if you are in breach of these Terms of Use, or if your use of the Website or Services would cause or risk causing legal liabilities of any kind, or otherwise disrupt others use of the Website or Services.

		20.	Effect of termination

		20.1	Upon termination of these Terms of Use:

		(a)	the licences contained in these Terms of Use will immediately cease and all your rights in respect of the Website, the Platform, Services and your Account and Wallet will cease;

		(b)	any requirement of SORS to provide Services or support will immediately cease; and

		(c)	you will immediately return or (at SORS’s direction) destroy all Confidential Information in your possession or power; and

		(d)	you must ensure all Cryptocurrencies are withdrawn prior to the effective date of termination. SORS will not be responsible for any delay in withdrawing the Cryptocurrencies.

		20.2	You will not, in any circumstances whatsoever, have any claim against SORS for compensation for loss of rights, loss of goodwill or any other loss whatsoever on termination of your Account, your Wallet or these Terms of Use for any cause whatsoever.

		20.3	The termination of these Terms of Use is without prejudice to any other rights which have already accrued to SORS and will not operate to affect such provisions of these Terms of Use as in accordance with their terms are expressed to operate or to have effect thereafter.

		21.	General provisions

		21.1	You may not assign any of your rights under these Terms of Use.

		21.2	The rights, powers and remedies provided in these Terms of Use are (except as expressly provided) cumulative and not exclusive of any rights, powers and remedies provided by law, or otherwise.

		SORS subcontract:

		(a) 	the hosting of the Website to a third party;

		(b)	the provision of Services to Arkane BV; and

		(c)	the Account and Wallet creation function to Arkane BV.



		21.4	If the validity or enforceability of any provision of these Terms of Use is in any way limited by any applicable law, that provision will be valid and enforceable to the fullest extent permitted by such law.  The invalidity or unenforceability of any such provision does not affect the validity or enforceability of any other provision.

		21.5	The failure to exercise, or delay in exercising, a right, power or remedy provided by these Terms of Use or by law does not constitute a waiver of that right, power or remedy. If SORS waives a breach of any provision of these Terms of Use, this does not operate as a waiver of a subsequent breach of that provision, or as a waiver of a breach of any other provision.

		21.6	The exercise of the parties’ rights under these Terms of Use is not subject to the consent of any third party.

		21.7	These Terms of Use are for SORS’s benefit and your benefit, and are not intended to benefit or be enforceable by any third party.

		21.8	These Terms of Use comprise the entire understanding and agreements between you and SORS as to its subject matter, and supersedes any and all prior discussions, agreements and understandings of any kind relating to its subject matter (including any prior versions of these Terms of Use).

		21.9	Both you and SORS are independent contractors. Nothing in these Terms of Use creates any other form of relationship between you and SORS. These Terms of Use are not to be interpreted as evidence of an association, joint venture, partnership, agency or franchise between the parties. You are not authorised to represent SORS in any way, or to incur any obligations on behalf of SORS.

		21.10	Terms that are defined in the Companies Ordinance (Chapter 622, Laws of Hong Kong) have the same meaning in these Terms of Use, unless otherwise defined in these Terms of Use.

		21.11	If you have any feedback, questions, complaints relating to our Service, the Website, the Platform, your Account and your Wallet, please submit the same to SORS at wallet@sorted.finance.. SORS will use reasonable effort to respond to you as soon as possible but SORS will not be responsible for any losses and damage incurred during SORS’s response period.

		21.12	Communications between you and SORS use electronic means, whether made via the Website, the Platform or sent via electronic mail, or whether SORS posts notices on the Website or the Platform. For contractual purposes, you:

		(a)	consent to receive communications from SORS in an electronic form; and

		(b)	agree that all terms and conditions, agreements, notices, disclosures, and other communication that SORS provides to you electronically satisfy any legal requirement that such communications would satisfy if it were to be in writing.

		22.	Governing law

		22.1	These Terms of Use, their subject matter and their formation (and any non-contractual disputes or claims) are governed by and construed in accordance with the laws of Hong Kong.

		22.2	Any dispute, controversy, difference or claim (including non-contractual disputes or claims) arising out of or relating to these Terms of Use, including the existence, validity, interpretation, performance, breach or termination thereof or any dispute regarding non-contractual obligations arising out of or relating to it shall be referred to and finally resolved by arbitration administered by the Hong Kong International Arbitration Centre (HKIAC) under the HKIAC Administered Arbitration Rules in force when the Notice of Arbitration is submitted. The law of this arbitration clause shall be Hong Kong law). The seat of arbitration shall be Hong Kong. The number of arbitrators shall be one. The arbitration proceedings shall be conducted in English.

		Please email support@sorted.finance if you have any questions or concerns about these Terms of Use or our Website.`
		]
    }
}
