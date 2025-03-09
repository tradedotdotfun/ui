import { useCallback, useEffect, useState } from 'react';
import { PublicKey } from '@solana/web3.js';
import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react';
import * as anchor from "@coral-xyz/anchor";


const PROGRAM_ID = new PublicKey("CoFf4ZpbTJRoPxdJ64JvMn4pVR1wjhvARc8ed91i9i37");

export const useDepositSol = () => {
  const wallet = useAnchorWallet();
  const { connection } = useConnection();
  const [idl, setIdl] = useState(null);

  useEffect(() => {
    fetch('/idl/trade_fun.json')
      .then((res) => res.json())
      .then((data) => setIdl(data))
      .catch((error) => console.error('Failed to load IDL', error));
  }, []);

  const depositSol = useCallback(async () => {
    if (!wallet || !wallet.publicKey || !idl) {
      return;
    }
    const provider = new anchor.AnchorProvider(connection, wallet, {});
    const program = new anchor.Program(idl as anchor.Idl, provider);

    // PDA 주소 계산
    const [vaultPDA] = await PublicKey.findProgramAddressSync(
      [Buffer.from("vault")],
      PROGRAM_ID
    );
    const [vaultDataPDA] = await PublicKey.findProgramAddressSync(
      [Buffer.from("vault_data")],
      PROGRAM_ID
    );

    // 트랜잭션 Instruction 구성 (Anchor 사용)
    // @ts-ignore
    const result = await program.methods
      .depositSol()
      .accounts({
        user: wallet.publicKey,
        vault: vaultPDA,
        vaultData: vaultDataPDA,
        systemProgram: anchor.web3.SystemProgram.programId,
      } as any)
      .rpc();

    return result;
    
  }, [idl, wallet]);

  return { depositSol };
}
