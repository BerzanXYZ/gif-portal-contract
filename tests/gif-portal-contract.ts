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
  
    console.log("Your tx id:", tx)
    process.exit(0)
  })()
} catch (error) {
  console.error(error)
  process.exit(1)
}
