import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

import puppeteer from 'puppeteer'
import sleep from './helpers/sleep'
import { Circle } from 'lucide-react';

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 500,
    height: 760,
    show: false,
    resizable: false,
    maximizable: false,
    maxHeight: 760,
    minHeight: 760,
    maxWidth: 500,
    minWidth: 500,
    title: 'The Edge - Text Blaster',
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.openDevTools()

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  ipcMain.handle('dispatch', async (event, args) => {
    event.sender.send('event', ['active'])
    const { text, bucket, sortBy, amount, previousContact, username, password } = args[0]

    if(!text || !bucket || !sortBy || !amount || !previousContact || !username || !password) return event.sender.send('error', ['Please ensure all data is filled.'])

    const browser = await puppeteer.launch({ headless: false, userDataDir: './tmp' })
    const page = await browser.newPage()
    await page.goto('https://app.club-os.com/action/Login/view')
    await page.setViewport({
      height: 1080,
      width: 1920
    })

    const usernameField = await page.$('input[name=username]')
    const passwordField = await page.$('input[name=password]')
    const loginButton = await page.$('button.js-login')

    await usernameField?.type(username)
    await passwordField?.type(password)
    await loginButton?.click()
    await sleep(3000)

    await page.goto('https://app.club-os.com/action/UserSearch')
    await sleep(3000)

    const noneBtn = await page.$('a#select-none')
    const memberBtn = await page.$('input#client-icon')
    const prospectBtn = await page.$('input#client-icon')
    await noneBtn?.click()

    await sleep(1500)

    if(bucket === 'WEB_LEAD') {
      await prospectBtn?.click()
      await page.select("select[name='filter.memberSalesFollowUpStatus']", '11')
    } else if(bucket === 'VIP_GEUST') {
      await prospectBtn?.click()
      await page.select("select[name='filter.memberSalesFollowUpStatus']", '10')
    } else if(bucket === 'PAID_PASS') {
      await prospectBtn?.click()
      await page.select("select[name='filter.memberSalesFollowUpStatus']", '20')
    } else if(bucket === 'MISSED_GUEST') {
      await prospectBtn?.click()
      await page.select("select[name='filter.memberSalesFollowUpStatus']", '3')
    } else if(bucket === 'APPT_NO_SHOW') {
      await prospectBtn?.click()
      await page.select("select[name='filter.memberSalesFollowUpStatus']", '12')
    } else if(bucket === 'EXPIRED_GUEST') {
      await prospectBtn?.click()
      await page.select("select[name='filter.memberSalesFollowUpStatus']", '5')
    } else if(bucket === 'GUEST_OF_TOTAL') {
      await prospectBtn?.click()
      await page.select("select[name='filter.memberSalesFollowUpStatus']", '9')
    } else if(bucket === 'CANCELLED') {
      await memberBtn?.click()
      await page.select("select[name='filter.memberSalesFollowUpStatus']", '15')
    } else if(bucket === 'COLLECTIONS') {
      await memberBtn?.click()
      await page.select("select[name='filter.memberSalesFollowUpStatus']", '16')
    }

    await sleep(1500)

    if(sortBy === 'DEFAULT') {
      await page.select('select[name="filter.sort"]', 'roleId asc,firstName asc,lastName asc')
    } else if(sortBy === 'CREATED_ASCENDING') {
        await page.select('select[name="filter.sort"]', 'createdDate asc')
    } else if(sortBy === 'CREATED_DESCENDING') {
        await page.select('select[name="filter.sort"]', 'createdDate desc')
    }

    await sleep(1500)

    let amnt = Number(amount)
    while(amnt > 0) {
      

      amnt--
      await sleep(1000)
    }
    await browser.close()
    event.sender.send('event', ['notActive'])
  })
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
