import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { FB_PROJECT_ID, FB_CLIENT_EMAIL, FB_PRIVATE_KEY } from '$env/static/private';
import pkg from 'firebase-admin';

const questions = [
  {
    "question": "Hány vármegye van magyarországon?",
    "answers": [
      {
        "id": "a",
        "value": "0"
      },
      {
        "id": "b",
        "value": "19"
      },
      {
        "id": "c",
        "value": "18"
      },
      {
        "id": "d",
        "value": "17"
      }
    ],
    "answer": "b"
  },
  {
    "question": "Ki volt Magyarország első köztársasági elnöke az 1989-es rendszerváltást követően?",
    "answers": [
      {
        "id": "a",
        "value": "József Antall"
      },
      {
        "id": "b",
        "value": "Árpád Göncz"
      },
      {
        "id": "c",
        "value": "Ferenc Mádl"
      },
      {
        "id": "d",
        "value": "Viktor Orbán"
      }
    ],
    "answer": "b"
  },
  {
    "question": "Melyik párt vezette az 1956-os forradalmat Magyarországon?",
    "answers": [
      {
        "id": "a",
        "value": "MSZMP (Magyar Szocialista Munkáspárt)"
      },
      {
        "id": "b",
        "value": "FIDESZ"
      },
      {
        "id": "c",
        "value": "SZDSZ (Szabad Demokraták Szövetsége)"
      },
      {
        "id": "d",
        "value": "MDP (Magyar Dolgozók Pártja)"
      }
    ],
    "answer": "a"
  },
  {
    "question": "Ki volt Magyarország miniszterelnöke az 1956-os forradalom idején?",
    "answers": [
      {
        "id": "a",
        "value": "Imre Nagy"
      },
      {
        "id": "b",
        "value": "Kádár János"
      },
      {
        "id": "c",
        "value": "Ferenc Gyurcsány"
      },
      {
        "id": "d",
        "value": "Viktor Orbán"
      }
    ],
    "answer": "a"
  },
  {
    "question": "Mi a neve a Magyarországon alkotmányosan meghatározott legfelsőbb törvényhozó szervnek?",
    "answers": [
      {
        "id": "a",
        "value": "Országgyűlés"
      },
      {
        "id": "b",
        "value": "Kormány"
      },
      {
        "id": "c",
        "value": "Alkotmánybíróság"
      },
      {
        "id": "d",
        "value": "Köztársasági Elnök"
      }
    ],
    "answer": "a"
  },
  {
    "question": "Melyik évben csatlakozott Magyarország az Európai Unióhoz?",
    "answers": [
      {
        "id": "a",
        "value": "1990"
      },
      {
        "id": "b",
        "value": "2004"
      },
      {
        "id": "c",
        "value": "2010"
      },
      {
        "id": "d",
        "value": "2016"
      }
    ],
    "answer": "b"
  },
  {
    "question": "Ki volt Magyarország miniszterelnöke az 1990-es évek közepén, az első szabad választások után?",
    "answers": [
      {
        "id": "a",
        "value": "Viktor Orbán"
      },
      {
        "id": "b",
        "value": "Gyula Horn"
      },
      {
        "id": "c",
        "value": "Ferenc Gyurcsány"
      },
      {
        "id": "d",
        "value": "József Antall"
      }
    ],
    "answer": "a"
  },
  {
    "question": "Melyik párt volt az 1989-es rendszerváltás után az első szabad választások győztese Magyarországon?",
    "answers": [
      {
        "id": "a",
        "value": "FIDESZ"
      },
      {
        "id": "b",
        "value": "MSZMP"
      },
      {
        "id": "c",
        "value": "SZDSZ"
      },
      {
        "id": "d",
        "value": "MDF (Magyar Demokrata Fórum)"
      }
    ],
    "answer": "d"
  },
  {
    "question": "Melyik évben nyerte el Magyarország az Európai Unió soros elnökségét utoljára?",
    "answers": [
      {
        "id": "a",
        "value": "2004"
      },
      {
        "id": "b",
        "value": "2011"
      },
      {
        "id": "c",
        "value": "2019"
      },
      {
        "id": "d",
        "value": "2023"
      }
    ],
    "answer": "c"
  },
  {
    "question": "Melyik államforma jellemzi Magyarországot a jelenlegi alkotmány alapján?",
    "answers": [
      {
        "id": "a",
        "value": "Köztársaság"
      },
      {
        "id": "b",
        "value": "Monarchia"
      },
      {
        "id": "c",
        "value": "Szocialista köztársaság"
      },
      {
        "id": "d",
        "value": "Parlamentáris demokrácia"
      }
    ],
    "answer": "d"
  },
  {
    "question": "Ki volt Magyarország miniszterelnöke az 1990-es évek végén, amikor a magyar gazdaság privatizációját indították el?",
    "answers": [
      {
        "id": "a",
        "value": "Viktor Orbán"
      },
      {
        "id": "b",
        "value": "Gyula Horn"
      },
      {
        "id": "c",
        "value": "Ferenc Gyurcsány"
      },
      {
        "id": "d",
        "value": "József Antall"
      }
    ],
    "answer": "b"
  }
];

try {
  pkg.initializeApp({
    credential: pkg.credential.cert({
      projectId: FB_PROJECT_ID,
      clientEmail: FB_CLIENT_EMAIL,
      privateKey: FB_PRIVATE_KEY,
    }),
  });
} catch (e) {
  if (!/already exists/u.test(e.message)) {
    console.error('Firebase admin initialization error', e.stack)
  }
};

export const adminAuth = getAuth();
export const adminDB = getFirestore();

export async function createQuestions() {
  const questionsRef = adminDB.collection('questions');
  for (const question of questions) {
    await questionsRef.add(question);
  }
}

