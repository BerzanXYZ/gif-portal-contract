import * as anchor from "@project-serum/anchor";

try {
  (async () => {
    console.log("🚀 Starting test...")
  
    const provider = anchor.AnchorProvider.env()
    anchor.setProvider(provider)

    const program = anchor.workspace.GifPortalContract

    const baseAccount = anchor.web3.Keypair.generate()

    let tx = await program.rpc.initialize({
      accounts: {
        baseAccount: baseAccount.publicKey,
        payer: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      },
      signers: [baseAccount]
    })
  
    console.log("Init Tx ID:", tx)

    let account = await program.account.baseAccount.fetch(baseAccount.publicKey)
    console.log('👀 GIF Count:', account.totalGifs.toString())

    let txAddGif = await program.rpc.addGif("https://media.giphy.com/media/HJXsW9ZQxZkWY/giphy.gif", {
      accounts: {
        baseAccount: baseAccount.publicKey,
        payer: provider.wallet.publicKey,
      },
    })

    console.log('Add Gif Tx ID:', txAddGif)

    account = await program.account.baseAccount.fetch(baseAccount.publicKey)
    console.log('👀 GIF Count:', account.totalGifs.toString());

    console.log('GIF List:', account.gifList)
    
    

    process.exit(0)
  })()
} catch (error) {
  console.error(error)
  process.exit(1)
}
