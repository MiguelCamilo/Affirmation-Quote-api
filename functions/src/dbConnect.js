import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { service_account } from "./secrets.js";

export function dbConnect() {
	if (!getApps().length) {
		initializeApp({
			credential: cert(service_account),
		});
	}
	return getFirestore(); 
}
