interface ApiResponse {
    status: "fulfilled" | "rejected"
    value?: any
    reason?: any
}

async function fetchDashboardData() {
    const userPromise = fetch('/api/user').then(res => res.json())
    const weatherPromise = fetch('/api/weather').then(res => res.json())

    try {
        const results = await Promise.allSettled([userPromise, weatherPromise])
        const userData = results[0].status === 'fulfilled' ? results[0].value : null
        const weatherData = results[1].status === 'fulfilled' ? results[1].value : "Weather unavailable"

        console.log({userData, weatherData});
    } catch (error) {
        console.error("This only hits if something fundamentally breaks", error)
    }
}

async function loadDataCorrect() {
    try{
        const response = await fetch('/api/broken')
        if(!response.ok){
            throw new Error('HTTP Error!')
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error()
    }
}


interface LoadingState { 
    status: 'loading'
}

interface SuccessState {
    status: "success"
    data: string[]
}

interface ErrorState {
    status: 'error'
    error: string
}

type AppState = LoadingState | SuccessState | ErrorState

function renderUI(state: AppState) {
    switch(state.status) {
        case 'loading':
            return "Loading....."
        case 'success': 
            return `Items: ${state.data.join(', ')}`
        case 'error': 
            return `Error ${state.error}`
    }
}


interface ApiResponses<T> {
    data: T
    status: number
    message: string
}

interface User {
    id: number
    name: string
}

interface Product {
    id: number
    title: string
    price: number
}

const userResponse: ApiResponses<User> = {
    status: 200,
    message: "Success", 
    data: {id: 1, name: "Alex"}
}

interface User1 {
    id: string
    name: string
    email: string
    avatarUrl: string
    role: 'admin' | 'user'
    createdAt: string
}

type AvatarProps = Pick<User1, 'name' | 'avatarUrl'>

function Avatar({name, avatarUrl}: AvatarProps){
    // return <img src={avatarUrl} alt= {name}/>
}

type CreateUserFormData = Omit<User1, 'id' | 'createdAt'>

type UpdateProfileInput = Partial<User>

function setupClock(){
    setInterval(() => {
        console.log("Tick tack... updating clock UI")
    }, 1000)
}

class ClockComponent {
    private internalId: any

    public mount() {
        this.internalId = setInterval(() => {
            console.log("Updating Clock....")
        }, 1000)
    }

    public unmount() {
        clearInterval(this.internalId)
        console.log("Cleaned up safely");
    }
}

class ScrollTracker {
    private handleScroll = () => {
        console.log("user is scrolling");
    }

    public mount() {
        window.addEventListener('scroll', this.handleScroll)
    }

    public unmount() {
        window.removeEventListener('scroll', this.handleScroll)
    }
}

class ChatFeature {
    private socket: WebSocket | null = null

    public connect() {
        this.socket = new WebSocket('ws://example.com/chat')

        this.socket.onmessage = (event) => {
            console.log("New message:", event.data)
        }
    }

    public disconnect() {
        if(this.socket){
            this.socket.close()
            this.socket = null
            console.log('Disconnected successfully');
        }
    }
}

let activeTab = 'users'
let tableData = []

async function switchTab<T>(tabName: T) {
    const tabRequestedAtStart = tabName
    activeTab = tabName

    const data = await fetch ('').then(res => res.json())

    if(tabRequestedAtStart !== activeTab) {
        console.log('Discarding stale data');
        return;
    }

    tableData = data
}


let currentController: AbortController | null = null

async function searchProducts(query: string) {
    if(currentController) {
        currentController.abort()
        console.log("Previous request cancelled mid-flight");
    }

    currentController = new AbortController()
     
    try {
        const response = await fetch('/api/search', {
            signal: currentController.signal,

        }) 

        const data = await response.json()
        return data
    } catch (error: any){
        if(error.name === 'AbortError'){
            console.log("Fetch successfully aborted, ignoring error"); 
        } else {
            console.error('An actual network error happened', error)
        }
    }
}


