import React from 'react';

function Header() {
	return (
		<header class="site-header">
			<nav class="navbar navbar-default">
				<div class="container">
					<div class="navbar-header">
						<button class="navbar-toggle" type="button" data-toggle="collapse" data-target="#navbar-collapse"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span>
						</button>
						<h1 class="navbar-brand"><a href="https://auth0.com/"><span>Auth0</span></a></h1><a class="no-basic hiring animated bounce hidden-sm hidden-xs hidden-md" href="https://auth0.com/jobs">We&apos;re hiring!</a>
					</div>
					<div class="collapse navbar-collapse" id="navbar-collapse">
						<ul class="nav navbar-nav navbar-left no-basic">
							<li class="li-why"><a href="https://auth0.com/why-auth0">Why Auth0</a>
							</li>
							<li class="li-how"><a href="https://auth0.com/how-it-works">How It Works</a>
							</li>
							<li class="li-pricing"><a href="https://auth0.com/pricing">Pricing</a>
							</li>
							<li class="dropdown"><span class="btn-dro" role="button" data-toggle="dropdown">More<i class="icon-budicon-460"></i></span>
								<ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">
									<li><a href="https://auth0.com/lock">Lock</a>
									</li>
									<li><a href="https://auth0.com/passwordless">Passwordless</a>
									</li>
									<li><a href="https://auth0.com/wordpress">WordPress</a>
									</li>
									<li class="divider"></li>
									<li><a href="https://auth0.com/about">About</a>
									</li>
									<li><a href="https://auth0.com/blog">Blog</a>
									</li>
									<li><a href="https://auth0.com/customers">Customers</a>
									</li>
									<li><a href="https://auth0.com/resources">Resources</a>
									</li>
									<li><a href="https://auth0.com/partners">Partners</a>
									</li>
									<li><a href="https://auth0.com/opensource">Open Source</a>
									</li>
									<li><a href="https://auth0.com/jobs">Jobs</a>
									</li>
									<li><a href="https://auth0.com/press">Press</a>
									</li>
								</ul>
							</li>
						</ul>
						<ul class="nav navbar-nav navbar-right">
							<li class="li-docs no-basic"><a href="https://auth0.com/support">Help &amp; Support</a>
							</li>
							<li class="li-docs no-basic"><a href="https://auth0.com/docs">Documentation</a>
							</li>
							<li><a class="signin-button login" href="https://manage.auth0.com">Open Dashboard</a>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</header>
	);
}

export default Header;
