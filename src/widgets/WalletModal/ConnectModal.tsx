/** @jsxImportSource theme-ui */
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "../../components/Link";
import { Modal, ModalHeader } from "../Modal";
import WalletCard from "./components/WalletCard";
import config from "./config";
import { Login } from "./types";
import { Flex } from "../../components/Flex";
import { Text } from "../../components/Text";
import { Button } from "../../components/Button";
import { Svg } from "../../components/Svg";
import WalletImage from "./icons/walletImage";
import PrioritizedWallets from "./components/PrioritizedWallets";
import AllWallets from "./components/AllWallets";

interface Props {
  login: Login;
  t: (key: string) => string;
  connectError: boolean;
}

const modalProps = {
  sx: {
    zIndex: 11,
    maxHeight: "calc(100% - 30px)",
    height: ["395px", "395px", "455px"],
    width: ["280px", "280px", "620px"],
    maxWidth: ["280px", "280px", "620px"],
    minWidth: ["unset", "unset", "620px"],
    overflow: "hidden",
    "& hr": { display: "none" },
  },
};

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

const ConnectModal: React.FC<Props> = ({ login, t, connectError }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Modal {...modalProps}>
      <ModalHeader {...{ sx: { height: "24px" } }}>
        {open && (
          <Flex onClick={() => setOpen(false)} sx={{ "&:hover": { cursor: "pointer" } }}>
            <Svg icon="caret" direction="left" />
            <Text sx={{ fontWeight: 700, ml: "5px", fontSize: "14px" }}>{t("Back")}</Text>
          </Flex>
        )}
      </ModalHeader>
      <AnimatePresence initial={false}>
        <motion.div
          key={open ? "wallets" : "connect"}
          custom={open ? 1 : -1}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          sx={{ width: "100%" }}
        >
          {!open ? (
            <PrioritizedWallets t={t} connectError={connectError} login={login} setOpen={setOpen} />
          ) : (
            <AllWallets t={t} connectError={connectError} login={login} />
          )}
        </motion.div>
      </AnimatePresence>
    </Modal>
  );
};

export default ConnectModal;
