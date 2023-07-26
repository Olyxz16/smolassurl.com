<script> 

    import { isValid } from '$lib/urlvalidation';

    let url = "";
    let result = "";
    let valid = true;

    async function onSubmit() {
        console.log(url);
        if(!isValid(url)) {
            valid = false;
            return;
        }
        valid = true;
        const body = JSON.stringify(url);
        const res = await fetch("/", 
        { 
            method: 'post',
            body: body,
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(res => res.blob());
        result = await res.text();
    }

</script>


<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>    

<form on:submit|preventDefault={onSubmit}>
    <input type="text" bind:value={url}/>
    <button> go </button>
</form>

{#if result != "" && valid}  
    <p> result: {result} </p>
{:else if !valid}
    <p> URL invalide </p>
{/if}