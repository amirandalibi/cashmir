<template>
  <aside class="sidebar">
    <router-link :to="{ name: 'landing' }"><img src="https://place-hold.it/100x20&text=logo"/></router-link>
    <nav>
      <ul class="sidebar-navigation">
        <li>
          <div class="nav-item_container">
            <router-link :to="{ name: 'dashboard' }">Dashboard</router-link>
          </div>
        </li>
        <li>
          <div class="nav-item_container">
            <a href="/">Transactions</a>
          </div>
          <!-- sub navigation -->
          <ul class="sub-navigation">
            <li class="nav-item">
              <div class="sub-nav-item_container">
                <a href="/">Tags</a>
              </div>
            </li>
          </ul>
        </li>
        <li>
          <div class="nav-item_container">
            <a href="/">Expenses</a>
          </div>
          <!-- sub navigation -->
          <ul class="sub-navigation">
            <li class="nav-item">
              <div class="sub-nav-item_container">
                <a href="/">Funding Schedules</a>
              </div>
            </li>
          </ul>
        </li>
        <li>
          <div class="nav-item_container">
            <a href="/">Savings</a>
          </div>
        </li>
        <li>
          <div class="nav-item_container">
            <a href="/rules">Rules</a>
          </div>
        </li>
        <li>
          <div class="nav-item_container">
            <a href="/">Accounts</a>
          </div>
        </li>
        <li>
          <div class="nav-item_container">
            <a href="/">Profile</a>
          </div>
          <!-- sub navigation -->
          <ul class="sub-navigation">
            <li class="nav-item">
              <div class="sub-nav-item_container">
                <a href="/">Edit Profile</a>
              </div>
            </li>
            <li class="nav-item">
              <div class="sub-nav-item_container">
                <a href="/">Email & Password</a>
              </div>
            </li>
            <li class="nav-item">
              <div class="sub-nav-item_container">
                <a href="/">Manage Your Data</a>
              </div>
            </li>
            <li class="nav-item">
              <div class="sub-nav-item_container">
                <a href="/">Your Sessions</a>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </aside>
</template>
