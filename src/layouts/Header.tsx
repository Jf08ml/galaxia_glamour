import { Text, Box, Group, ActionIcon, Menu } from "@mantine/core";
import {
  FaFacebook,
  FaGlobe,
  FaInstagram,
  FaTiktok,
  FaWhatsapp,
} from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useMediaQuery } from "@mantine/hooks";

const Header = () => {
  const isVerySmallScreen = useMediaQuery("(max-width: 346px)");
  const [menuOpened] = useState(false);

  const organization = useSelector(
    (state: RootState) => state.organization.organization
  );
  const { name, facebookUrl, instagramUrl, whatsappUrl, tiktokUrl } =
    organization || {};

  return (
    <Box
      component="header"
      p="0.5rem 0"
      style={{
        width: "100%",
      }}
    >
      <Group justify="space-between" px="sm" style={{ flexWrap: "wrap" }}>
        <Text
          size="xl"
          fw={900}
          variant="gradient"
          gradient={{ from: "#FFD700", to: "#7928CA", deg: 182 }}
          style={{
            textShadow: "2px 2px 4px hsla(21, 72.60%, 58.40%, 0.50)",
          }}
        >
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            {name}
          </Link>
        </Text>

        <Group
          gap="xl"
          className="menu-links"
          style={{
            display: menuOpened ? "flex" : "none",
            alignItems: "center",
          }}
        >
          <Text c="white" fw={600}>
            <Link
              to="/servicios-precios"
              style={{ textDecoration: "none", color: "white" }}
            >
              Precios y servicios
            </Link>
          </Text>
          <Text c="white" fw={600}>
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              Plan de fidelidad
            </Link>
          </Text>
        </Group>

        {/* Redes Sociales */}
        {isVerySmallScreen ? (
          // Mostrar menú en pantallas muy pequeñas
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <ActionIcon radius="xl" size="md" variant="filled" color="dark">
                <FaGlobe />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              {facebookUrl && (
                <Menu.Item
                  leftSection={<FaFacebook />}
                  component="a"
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </Menu.Item>
              )}
              {instagramUrl && (
                <Menu.Item
                  leftSection={<FaInstagram />}
                  component="a"
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </Menu.Item>
              )}
              {whatsappUrl && (
                <Menu.Item
                  leftSection={<FaWhatsapp />}
                  component="a"
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </Menu.Item>
              )}
              {tiktokUrl && (
                <Menu.Item
                  leftSection={<FaTiktok />}
                  component="a"
                  href={tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  TikTok
                </Menu.Item>
              )}
            </Menu.Dropdown>
          </Menu>
        ) : (
          // Mostrar íconos normalmente en pantallas más grandes
          <Group
            gap="xs"
            className="social-icons"
            style={{
              justifyContent: "center",
            }}
          >
            {facebookUrl && (
              <a href={facebookUrl} target="_blank" rel="noopener noreferrer">
                <ActionIcon radius="xl" size="md" variant="filled" color="blue">
                  <FaFacebook />
                </ActionIcon>
              </a>
            )}
            {instagramUrl && (
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer">
                <ActionIcon radius="xl" size="md" variant="filled" color="pink">
                  <FaInstagram />
                </ActionIcon>
              </a>
            )}
            {whatsappUrl && (
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <ActionIcon
                  radius="xl"
                  size="md"
                  variant="filled"
                  color="green"
                >
                  <FaWhatsapp />
                </ActionIcon>
              </a>
            )}
            {tiktokUrl && (
              <a href={tiktokUrl} target="_blank" rel="noopener noreferrer">
                <ActionIcon
                  radius="xl"
                  size="md"
                  variant="filled"
                  color="black"
                >
                  <FaTiktok />
                </ActionIcon>
              </a>
            )}
          </Group>
        )}
      </Group>
    </Box>
  );
};

export default Header;
