<script> 

    import axios from 'axios';
    import { isValid } from '$lib/urlvalidation';
    import { onMount } from 'svelte';
   
    let origin = ``;
    onMount(() => origin = window.location.origin);

    let url = "";
    let result = "";
    let valid = true;

    async function onSubmit() {
        valid = isValid(url);
        if(!valid) {
            return;
        }
        axios.post('/', {data: url})
        .then(res => result = res.data);
    }

</script>

<div style="position: absolute; left: 10%; top: 10%"> 

    <h1>Welcome to Smolassurl</h1>
    <p>Visit <a href="/">this</a> to read.</p>    

    <form on:submit|preventDefault={onSubmit}>
        <label for="input"> url: </label>
        <input type="text" name="input" bind:value={url}/>
        <button> go </button>
    </form>

    {#if result != "" && valid}
        <p> result: {origin}/{result} </p>
    {:else if !valid}
        <p> URL invalide </p>
    {/if}

</div>

<footer style="bottom: 0%; position: absolute; left:0; width: 100%; margin: 0; overflow: hidden;">
    <div style="text-align: center;">  </div>
</footer>


