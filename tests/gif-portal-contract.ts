import * as anchor from "@project-serum/anchor";

try {
  (async () => {
    console.log("🚀 Starting test...")
  
    anchor.setProvider(anchor.AnchorProvider.env())
    const program = anchor.workspace.GifPortalContract
    const tx = await program.rpc.initialize()
  
    console.log("Your tx id:", tx)
    process.exit(0)
  })()
} catch (error) {
  console.error(error);
}
