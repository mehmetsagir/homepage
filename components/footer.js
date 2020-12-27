import React from 'react'

import Grid, { ColContent } from './grid'
import Html from './html'

import styles from './footer.module.css'
import Container from '@comp/container'

function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <Grid>
          <ColContent>
            <Html>
              <p>
                Bu web sitesini NextJS ile kodlayıp,{' '}
                <a
                  href="https://github.com/ademilter/homepage"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  kaynak kodlarını
                </a>{' '}
                github üzerinden paylaştım &lt;3
              </p>
            </Html>
          </ColContent>
        </Grid>
      </Container>
    </footer>
  )
}

export default Footer
