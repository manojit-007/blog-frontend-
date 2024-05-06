import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer>
      <ul className="footer_category">
        <li><Link to="/posts/categories/Uncategorized">Uncategorized</Link></li>
        <li><Link to="/posts/categories/Technology">Technology</Link></li>
        <li><Link to="/posts/categories/Travel">Travel</Link></li>
        <li><Link to="/posts/categories/Food">Food</Link></li>
        <li><Link to="/posts/categories/Fashion">Fashion</Link></li>
        <li><Link to="/posts/categories/Health">Health</Link></li>
        <li><Link to="/posts/categories/Sports">Sports</Link></li>
        <li><Link to="/posts/categories/Education">Education</Link></li>
        <li><Link to="/posts/categories/Entertainment">Entertainment</Link></li>
        <li><Link to="/posts/categories/Business">Business</Link></li>
        <li><Link to="/posts/categories/Science">Science</Link></li>
        <li><Link to="/posts/categories/Art">Art</Link></li>
        <li><Link to="/posts/categories/Music">Music</Link></li>
        <li><Link to="/posts/categories/Fitness">Fitness</Link></li>
        <li><Link to="/posts/categories/Books">Books</Link></li>
        <li><Link to="/posts/categories/Photography">Photography</Link></li>
      </ul>
      <div className="footer_copyright">
      <small>Copyright © 2024 <span>B</span>log. All rights reserved.</small> 
      </div>
    </footer>
  )
}

export default Footer

