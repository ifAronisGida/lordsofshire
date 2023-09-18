<script lang="ts">
	import AuthCheck from '$lib/components/AuthCheck.svelte';
	import { user, userData, storage, firestore } from '$lib/firebase';
	import { FileButton, ProgressBar } from '@skeletonlabs/skeleton';
	import { doc, updateDoc } from 'firebase/firestore';
	import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

	let previewURL: string;
	let uploading = false;

	async function upload(e: any) {
		uploading = true;
		const file = e.target.files[0];
		previewURL = URL.createObjectURL(file);
		const storageRef = ref(storage, `users/${$user!.uid}/profile.png`);
		const result = await uploadBytes(storageRef, file);
		const url = await getDownloadURL(result.ref);

		await updateDoc(doc(firestore, 'users', $user!.uid), { photoURL: url });
		uploading = false;
	}
</script>

<AuthCheck>
	<h2 class="card-title">Kép feltöltése</h2>

	<form class="w-full">
		<div class="form-control w-full max-w-xs my-10 mx-auto">
			<img
				src={previewURL ?? $userData?.photoURL ?? '/user.png'}
				alt="photoURL"
				width="256"
				height="256"
				class="mx-auto p-3 border-primary rounded-full"
			/>
			<FileButton
				on:change={upload}
				name="photoURL"
				type="file"
				class="w-full max-w-xs mt-10"
				accept="image/png, image/jpeg, image/gif, image/webp">Válassz egy képet</FileButton
			>
			{#if uploading}
				<div class="content-center p-4">
					<p>Feltöltés...</p>
					<ProgressBar className="w-56 mt-6" />
				</div>
			{/if}
		</div>
	</form>

	{#if !uploading}<a href="/" class="btn variant-filled-primary m-3 p-auto"> Kész! </a>{/if}
</AuthCheck>
