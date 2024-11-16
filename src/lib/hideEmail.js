export default function hideEmail(email) {
    const firstCharacter = email[0];
    const indexOfEmail = email.indexOf("@");
    const lastCharacter = email[indexOfEmail - 1];
    const replaceCharacters = "*".repeat(indexOfEmail - 2);
    return (
      firstCharacter +
      replaceCharacters +
      lastCharacter +
      "@" +
      email.slice(indexOfEmail + 1)
    );
  }


