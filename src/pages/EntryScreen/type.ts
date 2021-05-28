import React from 'react'

export interface ITab {
  key: string,
  tab: React.ReactNode
}

export interface IContent {
  [key: string]: React.ReactNode
}