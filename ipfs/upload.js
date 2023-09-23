async function run() {


    const { create} = await import('ipfs-http-client');
    // const ipfs = create({ host: '127.0.0.1', port: 5001 });
    const ipfs = create(new URL('http://127.0.0.1:5001'));
    // we added three attributes, add as many as you want!    
    // we added three attributes, add as many as you want!
    const metadata = {
        path: '/metadata.json',
        duplex: 'true',
        content: JSON.stringify({
            name: "My Naruto NFT",
            attributes: [
            {
                "trait_type": "Peace",
                "value": "10" 
            },
            {
                "trait_type": "Love",
                "value": "100"
            },
            {
                "trait_type": "web3",
                "value": "1000"
            }
            ],
            // update the IPFS CID to be your image CID
            image: "https://ipfs.io/ipfs/QmcLr6r7XzmG79tyFWsHi4TWFAGHevehxU1GkbkN4Nqkh7",
            description: "Naruto!"
        })
    };

    const result = await ipfs.add(metadata);
    console.log("result from ipfs/upload.js", result);
    // to make it show up in the file manager we'll use the files cd
    await ipfs.files.cp(`/ipfs/${result.cid}`, metadata.path)
// metadata.path 's value is /metadata.json
// you need a leading / for the path to be valid followed by what name do you want your file to have


    process.exit(0);
}

run();