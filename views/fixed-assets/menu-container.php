<nav id="menu-container" class="menu__sections menu--container animated">
    <div class="wrap">
        <a href="<?php echo $site_url; ?>" class="menu--item menu--item--home"><i class="fa fa-home" aria-hidden="true"><span class="screen-reader-text">Home</span></i> Home</a>
        <h2>More about me:</h2>
        <p>
            <a href="<?php echo $site_url; ?>/manifesto" class="menu--item">My Manifesto <span>what I believe in and value</span></a>
        </p>
        <p>
            <a href="<?php echo $site_url; ?>/about" class="menu--item">About Me <span>a wee bit about me</span></a>
        </p>
        <h2>I write and teach here:</h2>
        <p>
            <a href="<?php echo $site_url; ?>/blog" class="menu--item">My Blog <span>I write about engineering, leadership, & life</span></a>
            <a href="https://leanpub.com/u/hellofromtonya" class="menu--item">My Books <span>my books on Leanpub to help you be more awesome</span></a>
            <a href="https://knowthecode.io" class="menu--item">Know the Code<span>teaching professional web development and programming</span></a>
        </p>
        <footer class="menu__container-social">
            <h2>Connect with me:</h2>
            <?php include( 'nav-connect.html' ); ?>
        </footer>
    </div>
</nav>