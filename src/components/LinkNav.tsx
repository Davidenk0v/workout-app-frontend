import { Link } from "react-router-dom";

interface LinkProps {
  dataTest: string;
  to: string;
  text: string;
}

export const LinkNav: React.FC<LinkProps> = ({ dataTest, to, text }) => {
  const linkStyle =
    "block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent";
  return (
    <li>
      <Link data-test={dataTest} to={to} className={linkStyle}>
        {text}
      </Link>
    </li>
  );
};
