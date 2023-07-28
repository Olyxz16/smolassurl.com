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


<h1>Welcome to Smolassurl</h1>
<p>Visit <a href="/">this</a> to read.</p>    

<form on:submit|preventDefault={onSubmit}>
    <label> url: </label>
    <input type="text" bind:value={url}/>
    <button> go </button>
</form>

{#if result != "" && valid}  
    <p> result: {result} </p>
{:else if !valid}
    <p> URL invalide </p>
{/if}