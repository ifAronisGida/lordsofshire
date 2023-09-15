import { auth } from "$lib/firebase";

import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  const credential = await signInWithPopup(auth, provider);

  const idToken = await credential.user.getIdToken();

  const res = await fetch("/api/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // 'CSRF-Token': csrfToken  // HANDLED by sveltekit automatically
    },
    body: JSON.stringify({ idToken }),
  });
}

export async function signOutSSR() {
  const res = await fetch("/api/signin", { method: "DELETE" });
  await signOut(auth);
}